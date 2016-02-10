angular.module("logiWebMainDataProvider", ['flux'])
.run(runBlock);

runBlock.$inject = ['MAPSACTIONS', 'APPACTIONS', 'flux'];
function runBlock(MAPSACTIONS, APPACTIONS, flux) {
    flux.dispatch(APPACTIONS.init, null);
    flux.dispatch(MAPSACTIONS.maps_init,null);
}

