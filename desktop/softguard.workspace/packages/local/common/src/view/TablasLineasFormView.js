//MIGRADO2024
Ext.define('Common.view.TablasLineasFormView', {
    extend : 'Ext.form.Panel',
    alias : ['widget.tablaslineasformview'],
    preventHeader: false,
    frame: false,
    border: 0,
    padding: 0,
    flex: 1,
    autoScroll: true,
    autoHeight : true,
    height: 600,
    /*layout: {
        type: 'vbox',
        align: 'stretch'
    },*/
    fieldDefaults : {
        labelAlign : 'left',
        labelWidth : 150//,
    	//anchor : '100%'
	},
    items: [
    {
        xtype: 'tabpanel',
        flex: 1,
        autoHeight : true,
        height: 600,
        items : [
            {
                title: 'Datos Generales',
                xtype: 'container',
                padding: 10,
                items:[
                     {
                        xtype : 'textfield',
                        name : 'lin_ccodigo',
                        itemId: 'lin_ccodigo',
                        fieldLabel: 'Codigo',
                        allowBlank : false,
                        enforceMaxLength: true,
                        //maxWidth: 150,
                        maxLength: 3,
                        vtype: 'alphanum',
                        minLength: 3,
                        validator: function(value){
                            var t = this;
                            
                            if(value != this.originalValue && this.originalValue != undefined) {
                                var filters = [{
                                    property : 'lin_ccodigo',
                                    value : value
                                }];      
                        
                                var model = 'Common.model.TablasLineasSearchModel';
                        
                                var store =Ext.create('Ext.data.Store',{
                                    model: model,
                                    pageSize: 50,
                                    remoteSort: true,
                                    remoteFilter: true,
                                    filters: filters,
                                    autoload: false
                                })
                                
                                store.load({callback: function (records, operation, success) {
                                
                                if (records.length > 0){
                                        t.markInvalid('El codigo ya existe');
                                        t.textValid = false;
                                    } else {
                                        
                                        if(value.length == 3) {
                                            t.clearInvalid();
                                            t.textValid = true;    
                                        } else {
                                            t.markInvalid('El codigo debe tener 3 caracteres.');
                                            t.textValid = false;
                                        }
                                        
                                    }   
                                    
                                    
                                }})
                            } else {
                                t.clearInvalid();
                                t.textValid = true;
                            }
                            return t.textValid;
                        }
                        
                    },{
                        xtype : 'textfield',
                        name : 'lin_crazonsocial',
                        fieldLabel: 'Compañia',
                        allowBlank : false,
                        maxLength: 60,
                        anchor : '100%',
                        validator: function(value){
                            if(value.substring(0,1) == "_") {
                                
                                this.textValid = "No puede comenzar con _";
                            } else {
                                this.clearInvalid();
                                this.textValid = true;
                            }
                            
                            return this.textValid;
                        
                        }
                    },{
                        xtype : 'textfield',
                        name : 'lin_ccalle',
                        fieldLabel: 'Calle',
                        maxLength: 60,
                        anchor : '100%'
                    },/*{
                        xtype : 'numberfield',
                        name : 'lin_inumero',
                        fieldLabel: 'Numero'
                    },{
                        xtype : 'numberfield',
                        name : 'lin_npiso',
                        fieldLabel: 'Piso'
                    },{
                        xtype : 'textfield',
                        name : 'lin_cdepartamento',
                        fieldLabel: 'Departamento',
                        maxLength: 3,
                    },*/{
                        xtype : 'textfield',
                        name : 'lin_clocalidad',
                        fieldLabel: 'Ciudad',
                        maxLength: 40,
                        anchor : '100%'
                    },{            
                        xtype : 'combo',
                        fieldLabel : 'Provincia',
                        itemId: 'provincia',
                        name : 'lin_cprovincia',
                        store : 'ProvinciasStore',			
                        displayField : 'pro_cdescripcion',
                        valueField : 'pro_ccodigo',
                        anchor : '100%',
                        queryMode: 'local'
                    /*{
                                            xtype : 'textfield',
                                            name : 'lin_cestado',
                                            fieldLabel: 'Estado',
                                            maxLength: 40,
                                        }*/
                                        },{
                                            xtype : 'textfield',
                                            name : 'lin_ccodigopostal',
                                            fieldLabel: 'Codigo postal',
                                            maxLength: 8,
                                            //enforceMaxLength: true,
                                            anchor : '100%',
                                            //maskRe: /[0-9\s]/,
                                            listeners: {
                                                blur: function(field) {
                                                    var v = (field.getValue() || '');
                                                    if(v === '') v = '00000000';
                                                    
                                                    if (v.length < 8) {
                                                        v = v.padStart(8, '');
                                                    }
                                                    field.setValue(v);
                                                }
                                            }/*,
                                            validator: function(value){
                                                if (!value) return true;
                                                var v = value.replace(/\s/g, '0');
                                                return /^\d{8}$/.test(v) ? true : 'El código postal debe tener 8 dígitos (los espacios se reemplazan por 0).';
                                            }*/
                                        },{
                                            xtype : 'textfield',
                                            name : 'lin_ctelfono',
                                            fieldLabel: 'Telefono',
                                            maxLength: 40,
                                            anchor : '100%'
                                        },{
                                            xtype : 'textfield',
                                            name : 'lin_cfax',
                                            fieldLabel: 'Fax',
                                            maxLength: 40,
                                            anchor : '100%'
                                        },{
                                            xtype:'container',
                                            layout: 'column',
                                            items:[
                                                {
                                                    xtype : 'textfield',
                                                    columnWidth: '0.40',
                                                    name : 'lin_cmail',
                                                    
                                                    fieldLabel: 'Mail',
                                //allowBlank : false,
                                maxLength: 100,
                                anchor : '100%'
                            },{
                                xtype : 'combo',
                                columnWidth: '0.30',
                                labelAlign: 'right',
                                fieldLabel : 'Recibir notificaciones por fallo de test en cuentas',
                                store : 'SiNoStore',
                                displayField : 'Name',
                                queryMode: 'local',
                                forceSelection: true,
                                valueField : 'Value',
                                name : 'lin_iEnviaMailPorFalloTest',
                                itemId: 'lin_iEnviaMailPorFalloTest'
                            }
                        ]
                    },{
                        xtype: 'container',
                        layout: 'hbox',
                        margin:'0 0 5 0',
                        items:[
                            {
                                xtype : 'displayfield',
                                name : 'lin_cimagen',
                                fieldLabel: 'Imagen',
                                maxLength: 60,
                            },{
                                xtype : 'button',
                                text : 'Selecciona foto',
                                iconCls : 'icon-photo',
                                action: 'photo',
                                margin:'0 0 0 5'
                            }
                        ]
                    },{
                        xtype : 'textfield',
                        name : 'lin_cusuario',
                        fieldLabel: 'Usuario',
                        maxLength: 60,
                        anchor : '100%'
                    },{
                        xtype : 'textfield',
                        name : 'lin_cclave',
                        fieldLabel: 'Clave',
                        inputType: 'password',
                        maxLength: 60,
                        anchor : '100%'
                    },{
                        xtype : 'combo',
                        //margin:'0 0 5 0',
                        labelAlign : 'left',
                        fieldLabel : 'Genera Alarma',
                        store : 'GeneraSiNoStore',
                        queryMode : 'local',
                        forceSelection : true,
                        editable : false,
                        valueField : 'Value',
                        displayField : 'Name',
                        name : 'lin_iOpnDespuesAlerta',
                        width : 250,
                        itemId : 'lin_iOpnDespuesAlerta'
                    },{
                        xtype: 'container',
                        layout: 'column',
                        anchor : '100%',
                        items: [
                            {
                                xtype : 'combo',
                                columnWidth: '0.40',
                                fieldLabel : 'Autoprocesa eventos',
                                store : 'DealerAutoprocesaStore',
                                displayField : 'Name',
                                queryMode: 'local',
                                forceSelection: true,
                                editable: false,
                                valueField : 'Value',
                                name : 'lin_iAutoProcesa',
                                hidden: false,
                                itemId: 'lin_iAutoProcesa'
                            },{
                                xtype : 'combo',
                                columnWidth: '0.30',
                                labelAlign: 'right',
                                fieldLabel : 'Escala eventos',
                                store : 'SiNoStore',
                                displayField : 'Name',
                                queryMode: 'local',
                                forceSelection: true,
                                editable: false,
                                valueField : 'Value',
                                name : 'lin_iEscala',
                                hidden: false,
                                itemId: 'lin_iEscala'
                            
                            },{
                                xtype: 'combo',
                                columnWidth: '0.30',
                                labelAlign: 'right',
                                fieldLabel: 'Alarmas por desactivación',
                                store : 'SiNoStore',
                                queryMode : 'local',
                                forceSelection : true,
                                editable : false,
                                valueField : 'Value',
                                displayField : 'Name',
                                name : 'lin_iGeneraAlarmaPorDesactivacion',
                                itemId : 'lin_iGeneraAlarmaPorDesactivacion'
                                
                            }
                        ]
                        
                    },{
                        xtype: 'container',
                        layout: 'hbox',
                        margin: '10 0 5 0',
                        itemId:'organizacioncontainer',
                        items:[
                            {
                                xtype : 'displayfield',    
                                fieldLabel : 'Entidad',
                                name : '_organization',
                                itemId:'_organization',
                                flex: 1
                            },
                            {
                                xtype: 'button',
                                action: 'organizationChange',
                                text: 'Seleccionar organización'
                            }
                        ]
                    },{
                        xtype: 'container',
                        layout: 'hbox',
                        anchor : '100%',
                        items: [
                            {
                                xtype: 'combobox',
                                columWith: '0.70',
                                store : 'SiNoStore',
                                displayField : 'Name',
                                queryMode: 'local',
                                forceSelection: true,
                                valueField : 'Value',                                
                                labelWidth: 350,
                                name: 'lin_iControlaCierreDespuesDeApertura',
                                itemId: 'lin_iControlaCierreDespuesDeApertura',
                                fieldLabel: 'Controla cierre luego de desactivación verificable/fuera de horario'
                            },{
                                columnWidth: '0.30',
                                labelAlign: 'right',
                                name: 'lin_iMinutosControlCDDA',
                                itemId: 'lin_iMinutosControlCDDA',
                                xtype: 'numberfield',
                                fieldLabel: 'Tiempo (minutos)'
                            }
                        ]
                    }
                ]
       //---------------------------------------------------------------------                 
            },{
                xtype:'container',
                title: 'Reportes automáticos',
                //anchor: '100%',
                //layout: 'hbox',
                items: [      
                    {
                        xtype:'m_reportes_automaticos_dealergridview',//xtype:'mreportesautomaticosdealerformview',
                        itemId:'m_reportes_automaticos_dealergridview',//itemId:'mreportesautomaticosdealerformview',
                        //anchor: '100%',
                        margin: '10 0 0 0',
                        //title:'Reportes automáticos',
                        border: 2,
                        minHeight : 600,
                        //flex:1
                    }
                ]
            },
            /**
             * BC 386071064 : Se agrega el nuevo controlador de notificaciones de dealer
             */
            {
                xtype:'tabpanel',
                title: 'Notificaciones',
                items:[
                    {
                        xtype: 'container',
                        title: 'E-mail',
                        items: [
                            {
                                xtype : 'notificacionesdealergridview', 
                                itemId: 'mailview',
                                stateId: 'mailgridview',
                                
                                //title: 'Notificaciones',
                                showMaximizer: false,
                                type: 'MAIL',
                                anchor: '100%',
                                margin: '10 0 0 0',
                                border: 2,
                                minHeight : 600,
                                flex: 1    
                            }
                        ]        
                    },
                    /**
                     * BC 390792274 : Se agrega el nuevo controlador de notificaciones de dealer
                     */
                    {
                        xtype: 'container',
                        title: 'Push',
                        items: [ 
                            {
                                    xtype : 'notificacionespushdealergridview', 
                                    itemId: 'mailpushview',
                                    stateId: 'mailgridview',
                                    
                                    //title: 'Notificaciones push',
                                    showMaximizer: false,
                                    type: 'PUSH',
                                    anchor: '100%',
                                    margin: '10 0 0 0',
                                    border: 2,
                                    minHeight : 600,
                                    flex: 1
                            }
                        ]
                    },{
                        xtype: 'container',
                        title: 'Controles',
                        items: [
                            {
                               xtype: 'notificacionescontrolesview' ,
                               itemId: 'notificacionescontrolesview',
                                anchor: '100%',
                                margin: '10 0 0 0',
                                border: 2,
                                minHeight : 400,
                                flex: 1                               
                            }
                        ]
                    }
                ]
            }
        ]
    }],
	initComponent : function() {
		this.callParent();
        
        var reportegrid = this.down('#m_reportes_automaticos_dealergridview');//var reporteform = this.down('#mreportesautomaticosdealerformview');
        if (reportegrid){
            reportegrid.record = this.record;
        }
        
        /**
         * BC 386071064 : Se agrega el pase del record al nuevo controlador de notificaciones de dealer
         */
        var notificacionesform = this.down('notificacionesdealergridview');
        if (notificacionesform){
            notificacionesform.record = this.record;
        }
        /**
         * BC 390792274 : Se agrega el pase del record al nuevo controlador de notificaciones de dealer
         */
        var notificacionespushform = this.down('notificacionespushdealergridview');
        if (notificacionespushform){
            notificacionespushform.record = this.record;
        }
        
        /**
         * https://softguard.atlassian.net/browse/DS-12
         */
        var notificacionesCtrlForm = this.down('notificacionescontrolesview');
        if (notificacionesCtrlForm){
            notificacionesCtrlForm.record = this.record;
        }
        var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            items: [
                {
                    iconCls: 'icon-table-save',
                    text: 'Guardar',
                    scope: this,
                    action: 'save'
                }
            ]// cierro items
         }); 
         this.addDocked(toolbar);
	} // cierro init
});