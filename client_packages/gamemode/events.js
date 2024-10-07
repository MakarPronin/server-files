mp.events.add('tpCommand', (x, y, z, dm) => {
    if (!dm) {
        dm = mp.players.local.dimension;
    }
    
    if (!z) {
        z = 0;
        mp.events.add("teleported", () => {
            mp.events.remove("teleported");
            const xCoord = parseFloat(x);
            const yCoord = parseFloat(y);
            new Promise((resolve) => {
                let timer = 0;
                let interval = setInterval(() => {
                    timer += 100;
                    if (mp.game.gameplay.getGroundZFor3dCoord(xCoord, yCoord, 1e6, 0.0, false) != 0 || timer > 1000) {
                        clearInterval(interval);
                        resolve();
                    }
                }, 100);
            }).then(() => {
                const groundZ = mp.game.gameplay.getGroundZFor3dCoord(xCoord, yCoord, 1e6,  0.0, false);
                const waterZ = mp.game.water.getWaterHeight(xCoord, yCoord, 1e6, 0);
                if (!waterZ) {
                    z = groundZ;
                }
                else {
                    z = waterZ;
                }
                if (z !== 0) {
                    mp.events.callRemote('tpRequest', x, y, z+2, dm);
                }
            })
        });
    }

    mp.events.callRemote('tpRequest', x, y, z+2, dm);
});