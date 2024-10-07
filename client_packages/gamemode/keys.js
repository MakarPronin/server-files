function pointingAt(distance) {
    const camera = mp.cameras.new("gameplay"); // gets the current gameplay camera

    let position = camera.getCoord(); // grab the position of the gameplay camera as Vector3

    let direction = camera.getDirection(); // get the forwarding vector of the direction you aim with the gameplay camera as Vector3

    let farAway = new mp.Vector3((direction.x * distance) + (position.x), (direction.y * distance) + (position.y), (direction.z * distance) + (position.z)); // calculate a random point, drawn on a invisible line between camera position and direction (* distance)

    let result = mp.raycasting.testPointToPoint(position, farAway, [1, 16]); // now test point to point

    if (result) {
        result.distance = Math.sqrt((result.position.x - position.x)**2 + (result.position.y - position.y)**2 + (result.position.z - position.z)**2);
    }

    return result; // and return the result ( undefined, if no hit )
}

mp.keys.bind(0x12, true, () => {
    let altPressed = true;
    let marker = mp.markers.new(0, mp.players.local.position, 0.5);
    let label = mp.labels.new("", marker.position,
    {
        los: true,
        font: 0.25,
        drawDistance: 500,
    });

    mp.keys.bind(0x12, false, () => {
        altPressed = false;
    });

    mp.keys.bind(0x58, true, () => {
        mp.events.call("tpCommand", marker.position.x, marker.position.y, marker.position.z, mp.players.local.dimension);
    })

    new Promise((resolve) => {
        let interval = setInterval(() => {
            if (!altPressed) {
                clearInterval(interval);
                resolve();
            }
            const hitData = pointingAt(500);
            if (hitData) {
                marker.destroy();
                marker = mp.markers.new(0, hitData.position, 0.5);
                const newLabelPos = {...marker.position, z: marker.position.z+1};
                label.position = newLabelPos;
                label.text = `entity: ${hitData.entity} surfaceNormal: ${hitData.surfaceNormal}\n\ndist: ${hitData.distance.toFixed(2)}`;
            }
        }, 10);
    }).then(() => {
        if (marker) {
            mp.keys.unbind(0x58);
            marker.destroy();
            label.destroy();
        }
    });
});

