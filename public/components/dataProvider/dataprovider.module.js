angular.module("logiWebMainDataProvider", ['flux'])
.run(runBlock);

runBlock.$inject = ['MAPSACTIONS', 'APPACTIONS', 'flux'];
function runBlock(MAPSACTIONS,flux) {
    flux.dispatch(MAPSACTIONS.maps_init,null);
    flux.dispatch(APPACTIONS.init,null);
}

