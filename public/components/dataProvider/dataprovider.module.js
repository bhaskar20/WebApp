angular.module("logiWebMainDataProvider", ['flux'])
.run(runBlock);

runBlock.$inject = ['MAPSACTIONS','flux'];
function runBlock(MAPSACTIONS,flux) {
    flux.dispatch(MAPSACTIONS.maps_init);
}

