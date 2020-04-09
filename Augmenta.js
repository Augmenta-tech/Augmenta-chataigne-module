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

		if(local.parameters.singleObjectMode.get() == "none")
		{
			// Clean and fold single person object
			local.values.singleObject.setCollapsed(true);
			resetAugmentaObject(local.values.singleObject, args);

		} else {
			// Unfold single person object panel
			local.values.singleObject.setCollapsed(false);
		}
	} else if(param.is(local.parameters.displayObjectExtraData))
	{
		if(local.parameters.displayObjectExtraData.get())
		{
			local.values.singleObject.getChild("Extra").setCollapsed(false);
			for (var i = 0; i < maxObjectsDisplayed; i++) {

 				local.values.getChild("object"+i).getChild("Extra").setCollapsed(false);
			}
		} else
		{
			local.values.singleObject.getChild("Extra").setCollapsed(true);
			for (var i = 0; i < maxObjectsDisplayed; i++) {

 				local.values.getChild("object"+i).getChild("Extra").setCollapsed(true);
			}
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
	} else if(address == "/object/update/extra")
	{

		// Update objects
		for(var i = 0 ; i < maxObjectsDisplayed ; i++)
		{
			 if(args[2] == i) // //args[2] = oid
			 {
 				setAugmentaExtraObject(local.values.getChild("object" + i), args);
			 }
		}

		// Update Oldest and newest
		// Oldest is always oid = 0 if algo is correctly implemented
		if(local.parameters.singleObjectMode.getData() == "oldest" && args[2] == 0)
		{
			setAugmentaExtraObject(local.values.singleObject, args);

		} else if(local.parameters.singleObjectMode.getData() == "newest" && args[2] == getNewestId())
		{

			setAugmentaExtraObject(local.values.singleObject, args);

		}

	} else if(address == "/object/enter/extra")
	{
		// Update objects
		for(var i = 0 ; i < maxObjectsDisplayed ; i++)
		{
			 if(args[2] == i) // //args[2] = oid
			 {
 				local.values.getChild("object" + i).setCollapsed(false);
 				setAugmentaExtraObject(local.values.getChild("object" + i), args);
			 }
		}

		// Update Oldest and newest
		// Oldest is always oid = 0 if algo is correctly implemented
		if(local.parameters.singleObjectMode.getData() == "oldest" && args[2] == 0)
		{
			setAugmentaExtraObject(local.values.singleObject, args);

		} else if(local.parameters.singleObjectMode.getData() == "newest" && args[2] == getNewestId())
		{
			setAugmentaExtraObject(local.values.singleObject, args);
		}

	} else if(address == "/object/leave")
	{
		
		for(var i = 0 ; i < maxObjectsDisplayed ; i++)
		{
			 if(args[2] == i) // //args[2] = oid
			 {
 				local.values.getChild("object" + i).setCollapsed(true);
 				resetAugmentaExtraObject(local.values.getChild("object" + i), args);
			 }
		}

		// Reset Oldest and newest
		// Oldest is always oid = 0 if algo is correctly implemented
		if(local.parameters.singleObjectMode.getData() == "oldest" && args[2] == 0)
		{
			resetAugmentaExtraObject(local.values.singleObject);

		} else if(local.parameters.singleObjectMode.getData() == "newest" && args[2] == getNewestId())
		{
			resetAugmentaExtraObject(local.values.singleObject);
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

function setAugmentaExtraObject(object, args)
{
	object.frame.set(args[0]);
	object.id.set(args[1]);
	object.oid.set(args[2]);
	object.highest.set(args[3],args[4]);
	object.distance.set(args[5]);
	object.reflectivity.set(args[6]);
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

function resetAugmentaExtraObject(object)
{
	object.frame.set(0);
	object.id.set(0);
	object.oid.set(0);
	object.highest.set(0,0);
	object.distance.set(0);
	object.reflectivity.set(0);
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
		// Newest is last id of the scene so newest oid is objectCount-1
		return local.values.scene.objectCount.get() - 1;

	} else
	{
		// no object in the scene
		return -1;
	}
}
