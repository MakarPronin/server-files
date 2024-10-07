mp.events.addCommand('tp', (player, fullText, x, y, z, dm) => {
    player.call("tpCommand", [x, y, z, dm]);
});

mp.events.addCommand("spawnVehicle", (player) => {
    mp.vehicles.new(mp.joaat("turismor"), player.position,
    {
        numberPlate: "ADMIN",
        color: [[0, 255, 0],[0, 255, 0]]
    });
});