/**
 * The main application class. An instance of this class is created by app.js when it
 * calls Ext.application(). This is the ideal place to handle application launch and
 * initialization details.
 */
Ext.define('Desktop.Application', {
    extend: 'Ext.app.Application',
    name: 'Desktop',
    quickTips: false,
    platformConfig: {
        desktop: {
            quickTips: true
        }
    },

    onAppUpdate: function () {
        Ext.Msg.confirm('Application Update', 'This application has an update, reload?',
            function (choice) {
                if (choice === 'yes') {
                    window.location.reload();
                }
            }
        );
    }
});

Ext.Date.formatFunctions['MS'] = function() {
    // UTC milliseconds since Unix epoch (MS-AJAX serialized date format (MRSF))
    return '\/Date(' + this.getTime() + Ext.Date.getGMTOffset(this) +')\/';
};


Ext.JSON.encodeDate = function(d) {
    var s = "\"" + Ext.Date.format(d, "MS") + "\"";
    return s;
};

