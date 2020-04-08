/*

Augmenta protocol :

https://github.com/Theoriz/Augmenta/wiki

This code has been tested on Chataigne 1.6.0

*/

// The module currently display 5 objects maximum declared in module.json
var maxObjectsDisplayed = 5;

function init()
{
	local.parameters.pass_through.setCollapsed(true);
	local.values.singleObject.setCollapsed(true);
	local.values.fusion.setCollapsed(true);
	local.scripts.setCollapsed(true);

	for(var i = 0 ; i < maxObjectsDisplayed ; i++)
	{	
		local.values.getChild("object" + i).setCollapsed(true);
	}
}

function moduleParameterChanged(param)
{
	if(param.is(local.parameters.singleObjectMode)) {

		if(local.parameters.singleObjectMode.getData() == "none")
		{
			// Clean and fold single person object
			local.values.singleObject.setCollapsed(true);
			resetAugmentaObject(local.values.singleObject, args);

		} else {
			// Unfold single person object panel
			local.values.singleObject.setCollapsed(false);
		}
	}
}

function oscEvent(address,args)
{

	if(address == "/scene")
	{
		setAugmentaScene(local.values.scene, args);

	} else if(address == "/object/update")
	{

		// Update objects
		for(var i = 0 ; i < maxObjectsDisplayed ; i++)
		{
			 if(args[2] == i) // //args[2] = oid
			 {
 				setAugmentaObject(local.values.getChild("object" + i), args);
			 }
		}

		// Update Oldest and newest
		// Oldest is always oid = 0 if algo is correctly implemented
		if(local.parameters.singleObjectMode.getData() == "oldest" && args[2] == 0)
		{
			setAugmentaObject(local.values.singleObject, args);

		} else if(local.parameters.singleObjectMode.getData() == "newest" && args[2] == getNewestId())
		{

			setAugmentaObject(local.values.singleObject, args);

		}

	} else if(address == "/object/enter")
	{
		// Update objects
		for(var i = 0 ; i < maxObjectsDisplayed ; i++)
		{
			 if(args[2] == i) // //args[2] = oid
			 {
 				local.values.getChild("object" + i).setCollapsed(false);
 				setAugmentaObject(local.values.getChild("object" + i), args);
			 }
		}

		// Update Oldest and newest
		// Oldest is always oid = 0 if algo is correctly implemented
		if(local.parameters.singleObjectMode.getData() == "oldest" && args[2] == 0)
		{
			setAugmentaObject(local.values.singleObject, args);

		} else if(local.parameters.singleObjectMode.getData() == "newest" && args[2] == getNewestId())
		{
			setAugmentaObject(local.values.singleObject, args);
		}

	} else if(address == "/object/leave")
	{
		
		for(var i = 0 ; i < maxObjectsDisplayed ; i++)
		{
			 if(args[2] == i) // //args[2] = oid
			 {
 				local.values.getChild("object" + i).setCollapsed(true);
 				resetAugmentaObject(local.values.getChild("object" + i), args);
			 }
		}

		// Reset Oldest and newest
		// Oldest is always oid = 0 if algo is correctly implemented
		if(local.parameters.singleObjectMode.getData() == "oldest" && args[2] == 0)
		{
			resetAugmentaObject(local.values.singleObject);

		} else if(local.parameters.singleObjectMode.getData() == "newest" && args[2] == getNewestId())
		{
			
			resetAugmentaObject(local.values.singleObject);
		}
	}
}

function setAugmentaObject(object, args)
{
	object.hasData.set(true);
	object.frame.set(args[0]);
	object.id.set(args[1]);
	object.oid.set(args[2]);
	object.age.set(args[3]);
	object.centroid.set(args[4],args[5]);
	object.velocity.set(args[6],args[7]);
	object.orientation.set(args[8]);
	object.boundingRectCoord.set(args[9],args[10]);
	object.boundingRectWidth.set(args[11]);
	object.boundingRectHeight.set(args[12]);
	object.boundingRectRotation.set(args[13]);
	object.height.set(args[14]);
}

function resetAugmentaObject(object)
{
	object.hasData.set(false);
	object.frame.set(0);
	object.id.set(0);
	object.oid.set(0);
	object.age.set(0);
	object.centroid.set(0,0);
	object.velocity.set(0,0);
	object.orientation.set(0);
	object.boundingRectCoord.set(0,0);
	object.boundingRectWidth.set(0);
	object.boundingRectHeight.set(0);
	object.boundingRectRotation.set(0);
	object.height.set(0);
}

function setAugmentaScene(scene, args)
{
	scene.frame.set(args[0]);
	scene.objectCount.set(args[1]);
	scene.width.set(args[2]);
	scene.height.set(args[3]);
}

function setAugmentaFusion(fusion, args)
{
	scene.videoOutPixelWidth.set(args[0]);
	scene.videoOutPixelHeight.set(args[1]);
	scene.videoOutCoord.x.set(args[2]);
	scene.videoOutCoord.y.set(args[2]);
	scene.sceneCoord.x.set(args[4]);
	scene.sceneCoord.y.set(args[5]);
}

function getNewestId(args)
{
	if(local.values.scene.objectCount.get() > 0)
	{
		if(local.values.scene.objectCount.get() == 1)
		{
			// Newest is the only object
			return 0;
		} else if (local.values.scene.objectCount.get() == 2)
		{
			// Newest is the second object
			return 1;
		} else if (local.values.scene.objectCount.get() > 2)
		{
			// TODO : detect which one is newest
			return 2;
		}

	} else
	{
		// no object in the scene
		return -1;
	}
}
