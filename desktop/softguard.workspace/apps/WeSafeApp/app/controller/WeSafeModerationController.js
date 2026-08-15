Ext.define('WeSafe.controller.WeSafeModerationController', {
        extend: 'Ext.app.Controller',
        views: ['WeSafeModerationView'],
    init: function () {
        this.control({
            'WeSafeModerationView': {
                afterrender: this.onViewLoad
            },
            'WeSafeModerationView button[text="Guardar configuración"]': {
                click: this.onGuardarClick
            },
            'WeSafeModerationView checkboxfield[itemId="chkAprobarTodos"]': {
                change: this.onAprobarTodosChange
            }
        });
    },

    // ✅ Al abrir la vista, obtener datos de BD y marcar los checkboxes
    onViewLoad: function (cmp) {
        var view = Ext.ComponentQuery.query('WeSafeModerationView')[0]; // ✅ Obtiene la vista correctamente
        if (!view) {
            console.error('❌ No se pudo encontrar la vista WeSafeModerationView');
            return;
        }
        Ext.Ajax.request({
            url: '/api/moderacion',
            method: 'GET',
            success: function (response) {
                var data = Ext.decode(response.responseText);

                // Recorrer datos y marcar los checkboxes según BD
                data.forEach(function (item) {
                    var field = view.down('#chk' + item.mod_idKey);
                    if (field) {
                        field.setValue(item.mod_nStatus === 1);
                    }
                });
            },
            failure: function () {
                Ext.Msg.alert('Error', 'No se pudo cargar la configuración.');
            }
        });
    },

    // ✅ Deshabilita los otros checkboxes si "Aprobar todos" está activado
    onAprobarTodosChange: function (field, newValue) {
        var container = field.up('form');
        container.query('checkboxfield').forEach(chk => {
            if (chk.itemId !== 'chkAprobarTodos') {
                chk.setDisabled(newValue);
            }
        });
    },

    // ✅ Guardar cambios en la BD con `PUT`
    onGuardarClick: function (button) {
        var view = button.up('form');
        var data = [];

        view.query('checkboxfield').forEach(function (chk) {
            data.push({
                mod_idKey: chk.itemId.replace('chk', ''), // Extrae el ID del itemId
                mod_nStatus: chk.getValue() ? 1 : 0
            });
        });

        Ext.Ajax.request({
            url: '/api/moderacion',
            method: 'PUT',
            jsonData: data,
            success: function () {
                Ext.Msg.alert('Éxito', 'Configuración actualizada correctamente.');
            },
            failure: function () {
                Ext.Msg.alert('Error', 'No se pudo actualizar la configuración.');
            }
        });
    }
});
