//MIGRADO2024
Ext.define('Common.view.mg_informacionPagoFormView', {
    extend: 'Ext.form.Panel',
    alias: ['widget.mginformacionpagoformview'],
    title: '',
    autoScroll: true,
    bodyPadding: 5,
    fieldDefaults: {
        labelWidth: 150,
        labelAlign: 'left',
        editable: false,
        width: '100%'
    },
    _locale: {
        labelCodigo: getLocale('Número tarjeta'),
        labelClave: getLocale('Código de seguridad'),
        labelNombre: getLocale('Identificador')
    },
    items: [
        {
            xtype: 'textfield',
            name: 'mip_codigo',
            itemId: 'mip_codigo',
            allowBlank: false,
        }, {
            xtype: 'textfield',
            name: 'mip_nombreusuario',
            itemId: 'mip_nombreusuario'
        }, {
            xtype: 'textfield',
            name: 'mip_clave',
            fieldLabel: 'Identificador',
            itemId: 'mip_clave',
            hidden: true
        }, {
            xtype: 'datefield',
            name: 'mip_fechadesde',
            itemId: 'mip_fechadesde',
            fieldLabel: 'Fecha Desde',
            plugins: ['clearbutton']
        }, {
            xtype: 'datefield',
            name: 'mip_fechahasta',
            itemId: 'mip_fechahasta',
            fieldLabel: 'Fecha Hasta',
            plugins: ['clearbutton']
        }, {
            xtype: 'button',
            iconCls: 'save',
            text: 'Guardar',
            scope: this,
            style: { align: 'right' },
            action: 'saveformapago'
        }
    ],

    initComponent: function () {
        this.callParent();
        this.down('#mip_codigo').setFieldLabel(this._locale.labelCodigo);
        this.down('#mip_clave').setFieldLabel(this._locale.labelClave);
        this.down('#mip_nombreusuario').setFieldLabel(this._locale.labelNombre);
    }
});
