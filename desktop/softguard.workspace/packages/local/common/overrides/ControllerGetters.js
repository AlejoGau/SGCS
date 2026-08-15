Ext.define('Common.overrides.ControllerGetters', {
    override: 'Ext.app.Controller',

    /**
     * Returns the ModuleModel class for the current application/controller.
     * Prefers the app-specific model (e.g., Awcc.model.ModuleModel), then
     * the controller namespace model (e.g., Cuenta.model.ModuleModel), and
     * finally falls back to Common.model.ModuleModel.
     */
    getModuleModelModel: function () {
        var ClassManager = Ext.ClassManager;

        // 1) Try application namespace: <AppName>.model.ModuleModel
        var appName = this.application && this.application.getName ? this.application.getName() : null;
        if (appName) {
            var appModelName = appName + '.model.ModuleModel';
            var AppModelClass = ClassManager.get(appModelName);
            if (AppModelClass) {
                return AppModelClass;
            }
        }

        // 2) Try controller's top-level namespace: <Namespace>.model.ModuleModel
        var controllerClass = this.$className || '';
        var topNs = controllerClass.indexOf('.') > -1 ? controllerClass.split('.')[0] : null;
        if (topNs) {
            var nsModelName = topNs + '.model.ModuleModel';
            var NsModelClass = ClassManager.get(nsModelName);
            if (NsModelClass) {
                return NsModelClass;
            }
        }

        // 3) Fallback to the shared Common model
        var CommonModelClass = ClassManager.get('Common.model.ModuleModel');
        if (CommonModelClass) {
            return CommonModelClass;
        }

        // As a last resort, attempt to resolve via ModelManager
        // (kept for legacy compatibility)
        if (Ext.ModelManager && Ext.ModelManager.getModel) {
            return Ext.ModelManager.getModel('Common.model.ModuleModel');
        }

        // If nothing resolves, throw a descriptive error to aid debugging
        Ext.raise('ModuleModel class not found in any known namespace');
    }
});
