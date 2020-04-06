/*

Augmenta protocol :

https://github.com/Theoriz/Augmenta/wiki

This code has been tested on Chataigne 1.6.0

*/

var objectCount = 0;

function init()
{
	local.parameters.pass_through.setCollapsed(true);
	local.values.singlePerson.setCollapsed(true);
}

function moduleParameterChanged(param)
{
	if(param.is(local.parameters.singlePersonMode)) {

		if(local.parameters.singlePersonMode.getData() == "none")
		{
			local.values.singlePerson.setCollapsed(true);
			local.values.person0.setCollapsed(false);
			local.values.person1.setCollapsed(false);
			local.values.person2.setCollapsed(false);
			local.values.person3.setCollapsed(false);
			local.values.person4.setCollapsed(false);

		} else {
			local.values.singlePerson.setCollapsed(false);
			local.values.person0.setCollapsed(true);
			local.values.person1.setCollapsed(true);
			local.values.person2.setCollapsed(true);
			local.values.person3.setCollapsed(true);
			local.values.person4.setCollapsed(true);
		}
	}
}

function oscEvent(address,args)
{

	if(address == "/scene")
	{
		setAugmentaScene(local.values.scene, args);

	} else if(address == "/object/update" || address == "/object/enter")
	{
		if(args[2] == 0) //args[2] = oid
		{
			setAugmentaPerson(local.values.person0, args);

			// Oldest is always oid = 0 if algo is correctly implemented
			if(local.parameters.singlePersonMode.getData() == "oldest")
			{
				setAugmentaPerson(local.values.singlePerson, args);	
			}
			
		} else if(args[2] == 1)
		{
			setAugmentaPerson(local.values.person1, args);
		} else if(args[2] == 2)
		{
			setAugmentaPerson(local.values.person2, args);
		} else if(args[2] == 3)
		{
			setAugmentaPerson(local.values.person3, args);
		} else if(args[2] == 4)
		{
			setAugmentaPerson(local.values.person4, args);
		}

		// Check and udate newest
		if(local.parameters.singlePersonMode.getData() == "newest")
		{
			updateNewest(args);
		}

	} else if(address == "/object/leave")
	{
		if(args[2] == 0) //args[2] = oid
		{
			resetAugmentaPerson(local.values.person0, args);

			// Oldest is always oid = 0 if algo is correctly implemented
			if(local.parameters.singlePersonMode.getData() == "oldest")
			{
				resetAugmentaPerson(local.values.singlePerson, args);	
			}
			
		} else if(args[2] == 1)
		{
			resetAugmentaPerson(local.values.person1, args);
		} else if(args[2] == 2)
		{
			resetAugmentaPerson(local.values.person2, args);
		} else if(args[2] == 3)
		{
			resetAugmentaPerson(local.values.person3, args);
		} else if(args[2] == 4)
		{
			resetAugmentaPerson(local.values.person4, args);
		}

		// Check and update newest
		if(local.parameters.singlePersonMode.getData() == "newest")
		{
			resetNewest(args);
		}
	}
}

function setAugmentaPerson(person, args)
{
	person.hasData.set(true);
	person.frame.set(args[0]);
	person.id.set(args[1]);
	person.oid.set(args[2]);
	person.age.set(args[3]);
	person.centroidX.set(args[4]);
	person.centroidY.set(args[5]);
	person.velocityX.set(args[6]);
	person.velocityY.set(args[7]);
	person.orientation.set(args[8]);
	person.boundingRectX.set(args[9]);
	person.boundingRectY.set(args[10]);
	person.boundingRectWidth.set(args[11]);
	person.boundingRectHeight.set(args[12]);
	person.boundingRectRotation.set(args[13]);
	person.height.set(args[14]);
}

function resetAugmentaPerson(person)
{
	person.hasData.set(false);
	/*person.pid.set(-1);
	person.oid.set(-1);
	person.age.set(0);
	person.centroidX.set(0);
	person.centroidY.set(0);
	person.velocityX.set(0);
	person.velocityY.set(0);
	person.depth.set(0);
	person.boundingRectX.set(0);
	person.boundingRectY.set(0);
	person.boundingRectWidth.set(0);
	person.boundingRectHeight.set(0);
	person.highestX.set(0);
	person.highestY.set(0);
	person.highestZ.set(0);*/
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
	scene.videoOutCoordX.set(args[2]);
	scene.videoOutCoordY.set(args[2]);
	scene.sceneCoordX.set(args[4]);
	scene.sceneCoordY.set(args[5]);
}

function updateNewest(args)
{

	//script.log("num people : " + scene.objectCount);

	if(args[1] == (objectCount - 1)) // args[1] is oid
	{
		setAugmentaPerson(local.values.singlePerson, args);	
	}
}

function resetNewest(args)
{
	if(args[1] == (objectCount - 1)) // args[1] is oid
	{
		resetAugmentaPerson(local.values.singlePerson, args);	
	}	
}
