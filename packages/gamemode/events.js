mp.events.add('tpRequest', (player, x, y, z, dm) => {
    let entity = player;
    if (player.vehicle !== undefined) {
        entity = player.vehicle;
    }
    
    entity.position = new mp.Vector3(parseFloat(x), parseFloat(y), parseFloat(z));
    entity.dimension = parseInt(dm);

    player.call("teleported");
});