//MIGRADO2024
Ext.define('Common.view.SoftguardUsuarioFormView', {
    extend : 'Ext.form.Panel',
    alias : 'widget.usuarioformview',
    preventHeader: true,
    frame : true,
	fieldDefaults : {
		labelAlign : 'left',
		labelWidth : 120,
		anchor : '100%'
	},
    isControlAcceso: '',
	items : [
        {
            xtype : 'checkbox',
            itemId : 'isControlAcceso',
            hidden: true
		},
        {
            xtype : 'numberfield',
			fieldLabel : 'Código',
			name : 'usu_icodigo',
            itemId : 'usu_icodigo',
            minValue : 1,
            allowBlank : false,
            validator: function(value){
                var t = this;                
                var view = t.up('usuarioformview')
                var store = view.storeSearch;
                var record = view.record;
                //var form = view.getForm();
                //var field = form.findField('usu_icodigo');
                var repeated = store.findExact('usu_icodigo', +value);
                
                if (repeated != -1 && record.get('Id') != store.getAt(repeated).get('Id')){
                    return 'El código de usuario ya existe';
                } else {
                }
                let isControlAcceso = t.up('usuarioformview').down('#isControlAcceso').getValue();
                if (!isControlAcceso && (value == '' || value == null)) {
                    //tarea de referencia
                    //https://basecamp.com/2249105/projects/2749985/todos/408476484#comment_826552975
                    t.markInvalid('El campo no puede estar vacio');
                    t.textValid = 'El campo no puede estar vacio';
                    return t.textValid;
                } else {
                    if(value == '' || value == null){
                        t.markInvalid('El campo no puede estar vacio');
                        t.textValid = 'El campo no puede estar vacio';
                    }else{
                        t.clearInvalid();
                        return true;
                    }
                }
                return t.textValid;   
            }
		},{
			xtype : 'textfield',
			fieldLabel : 'Nombre',
			name : 'usu_cnombre',
			allowBlank : false
		},{
            xtype: 'container',
            layout: 'hbox',
            itemId: 'claveCont',
            items: [
                {
                    xtype : 'textfield',
                    fieldLabel : 'Clave',
            		name : 'usu_cclave',
                    itemId: 'clave',
                   // disabled: true,
                   readOnly:true,
                    flex: 1,
                    inputType : 'password'
        		},{
                    xtype : 'textfield',
                    fieldLabel : 'Clave',
                    itemId: 'claveTxt',
                    //disabled: true,
                    readOnly:true,
                    hidden: true,
                    flex: 1
            	},
                {
                    xtype: 'button',
                    text: 'Cambiar',
                    action: 'passwordChange'
                }
            ]
        },{
            xtype : 'textareafield',
			fieldLabel : 'Observacion',
			name : 'usu_mobservacion'
		},{
            xtype : 'combobox',
			fieldLabel: 'Tipo',
            store: 'SoftguardUsuarioTipoStore',
			displayField: 'Name',	
            emptyText: getLocale('Seleccione'),
			valueField: 'Value',
            name: 'usu_ntipo',
            queryMode: 'local',
            itemId:'tipousuario'
		}
            ,{
            	xtype : 'textfield',
                
                //enforceMaxLength: true,
                //maxLength: 20,
    			fieldLabel: 'Id Extendido',
                itemId: 'idExt',
    			name : 'usu_cidextendido',
    			allowBlank : true,
                validator: function(value){
                    var t = this;
                    let isControlAcceso = t.up('usuarioformview').isControlAcceso;
                    if (isControlAcceso === 1) {
                        var reg = /^[0-9]*$/;
                        if(value == '') {
                            t.markInvalid('El campo no puede estar vacio');
                            t.textValid = 'El campo no puede estar vacio';
                        } else if (value.length > 10){
                            t.markInvalid('El valor debe ser menor o igual a 10 caracteres');
                            t.textValid = 'El valor debe ser menor o igual a 10 caracteres';
                        } else if (!value.match(reg)){
                            t.markInvalid('El valor ingresado debe ser numerico');
                            t.textValid = 'El valor ingresado debe ser numerico';
                        }else {
                            t.clearInvalid();
                            t.textValid = true;
                        }
                        return t.textValid;
                    }else if(isControlAcceso === 3 || isControlAcceso === 2){
                            var alphanumericRegEx = /^[a-zA-Z0-9]*$/;
                            if(value === '') {
                            t.markInvalid('El campo no puede estar vacio');
                            t.textValid = 'El campo no puede estar vacio';
                            }else if (value.length > 20) {
                                t.markInvalid('El valor debe ser menor o igual a 20 caracteres');
                                t.textValid = 'El valor debe ser menor o igual a 20 caracteres';
                            } else if (!alphanumericRegEx.test(value)) {
                                t.markInvalid('El valor ingresado debe ser alfanumérico');
                                t.textValid = 'El valor ingresado debe ser alfanumérico';
                            } else {
                                t.clearInvalid();
                                t.textValid = true;
                            }
                            return t.textValid;
                    }else{
                        t.clearInvalid();
                        return true;
                    }
                    
                }
    		}    ],
	buttons : [{
    		text : 'Guardar',
            action: 'save',
            itemId: 'save'
		},{
            text : 'Solicitar cambio',
    		iconCls : 'save',
            itemId: 'solitarcambio',
			action : 'solitarcambio',
            hidden:true
	    }, {
			text : 'Cancelar',
            action: 'cancel'
		}
    ],
	initComponent : function() {

		this.callParent(arguments);
	} // cierro init
});