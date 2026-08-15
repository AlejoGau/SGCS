Ext.define( 'Administrator.store.ServTecPanelModuleStore', {
    extend: 'Ext.data.TreeStore',
    model: 'Administrator' + '.model.ModuleModel',
    id: 'ServTecPanelModuleStore',
    root: {
        text: 'SerTec',
        expanded: true,
        children: [ {
            text: 'SerTec',
            iconCls: 'icon-servtec',
            view: 'sertecfullformview',
            leaf: true,
            closable: true,
            closeAction: 'destroy'
        }, {
                text: 'Productos',
                iconCls: 'icon-Product',
                view: 'servtecproductosordengridview',
                leaf: true,
                closable: true,
                closeAction: 'destroy'
            }, {
                text: 'Visitas',
                iconCls: 'icon-map-go',
                view: 'servtecvisitagridview',
                leaf: true,
                closable: true,
                closeAction: 'destroy'
            }, {
                text: 'Observaciones',
                iconCls: 'icon-historial',
                view: 'servtecobservacionesgridview',
                leaf: true,
                closable: true,
                closeAction: 'destroy'
            }, {
                text: 'Reclamos',
                iconCls: 'icon-book-error',
                view: 'servtecreclamosgridview',
                leaf: true,
                closable: true,
                closeAction: 'destroy'
            }, {
                text: 'Historico',
                iconCls: 'icon-book-edit',
                view: 'servtechistoricogridview',
                leaf: true,
                closable: true,
                closeAction: 'destroy'
            }, {
                text: 'Mapa',
                iconCls: 'icon-map',
                view: 'sertecmapformview',
                leaf: true,
                closable: true,
                closeAction: 'destroy'
            }, {
                text: 'Reporte Histórico2',
                iconCls: 'icon-reportes',
                leaf: true,
                profile: '0',
                view: 'recepcionview',
                closable: true,
                closeAction: 'destroy'
            }, {
                text: 'Informe-> Servicio Tecnico',
                iconCls: 'icon-wrench-orange',
                view: 'multicuentaserviciotecnicoextdelaersearchgridview',
                leaf: true,
                closable: true,
                closeAction: 'destroy'
            }, {
                text: 'Panel de alarma',
                iconCls: 'icon-panel',
                leaf: true,
                profile: '0',
                view: 'panelgridview',
                closable: true,
                closeAction: 'destroy'
            }, {
                text: 'Contactos',
                iconCls: 'icon-telefonos',
                leaf: true,
                view: 'gridphones',
                closable: true,
                closeAction: 'destroy'
            }, {
                text: 'Zonas',
                iconCls: 'icon-zonas',
                leaf: true,
                view: 'gridzone',
                closable: true,
                closeAction: 'destroy'
            }, {
                text: 'Cuenta1',
                iconCls: 'icon-cuenta',
                leaf: true,
                view: 'cuentaformview',
                closable: true,
                viewConfig: '{readOnly: true}',
                closeAction: 'destroy'
            },

        ]
    }// cierro children
    // cierra store
})

