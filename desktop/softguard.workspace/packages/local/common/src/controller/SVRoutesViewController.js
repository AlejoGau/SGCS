// MIGRADO2024
// Controller for the SofIA routes container. Ensures the form is hydrated and
// detail grids become available once a route is persisted.
Ext.define('Common.controller.SVRoutesViewController', {
    extend : 'Ext.app.Controller',
    views  : ['SVRoutesView'],

    /**
     * Registers basic listeners on the `svroutesview` container.
     */
    init: function() {
        this.control({
            'svroutesview': {
                beforerender: this.onInitView,
                routesaved : this.onRouteSaved
            }
        });
    },

    /**
     * Pre-loads the bound record so the form and child grids render with context.
     * @param {Common.view.SVRoutesView} view
     */
    onInitView: function(view) {
        if (view.record) {
            view.setRecord(view.record);
        }
    },

    /**
     * Reacts to a successful save enabling the detail grids.
     * @param {Common.view.SVRoutesView} view
     * @param {Common.model.SVRoutesModel} record
     */
    onRouteSaved: function(view, record) {
        if (view.enableDetailGrids) {
            view.enableDetailGrids(record);
        }
    }
});
