Ext.define('Administrator.view.AdministratorFormView', {
    extend: 'Ext.form.FormPanel',
    alias: 'widget.administratorformview',
    title: 'Administrador',
   
    items: [
        {
            xtype: 'uxiframe',
            itemId: 'iframelogout',
            height: 0,
            border : false,
            width:'100%'
        },
        {
            xtype : 'textfield',    
            fieldLabel : 'Usuario',
            name : 'udw_usuario',
            itemId:'emailuser',
            allowBlank: false,
            vtype : 'email' 
        },
        {
            xtype: 'container',
            layout: 'hbox',
            margin: '0 0 5 0',
            itemId:'clavecontainer',
            items: [
                {
                    xtype : 'textfield',
                    fieldLabel : 'Clave',
            		name : 'udw_clave',
                    allowBlank: false,
                    disabled: true,
                    flex: 1,
                    inputType : 'password',
                    itemId:'password'
        		},
                {
                    xtype: 'button',
                    text: 'Cambiar clave',
                    action: 'passwordChange'
                }
            ]
        },
        {
            xtype : 'textfield',    
            fieldLabel : 'Nombre',
            name : 'udw_nombre',
            itemId:'nombre'
        },
        {
            xtype : 'textfield',    
            fieldLabel : 'Apellido',
            name : 'udw_apellido',
            itemId:'apellido'
        },  
        {
            xtype: 'container',
            layout: 'hbox',
            margin: '0 0 5 0',
            itemId:'organizacioncontainer',
            items:[
                {
                    xtype : 'displayfield',    
                    fieldLabel : 'Entidad',
                    name : '_organization',
                    itemId:'organizacion',
                    flex: 1
                },
                {
                    xtype: 'button',
                    action: 'organizationChange',
                    text: 'Seleccionar organización'
                }/*,{
                    xtype: 'button',
                    margin: '0 0 0 5',
                    text: 'Nueva Organización',
                    tooltip: 'Nueva Organización',
                	iconCls : 'icon-add',
            		action : 'createorganization'
            	}*/
            ]
        },{            
            xtype : 'combo',
            fieldLabel : 'Provincia',
            itemId: 'provincia',
			name : 'lin_cprovincia',
			store : 'ProvinciasStore',			
        	displayField : 'pro_cdescripcion',
    		valueField : 'Id',
            anchor : '100%',
            queryMode: 'local'
		},
        {
            xtype: 'combo',
            store:'LocalizationLanguageStore',
            editable: false,
            queryMode: 'local',
            fieldLabel: 'Idioma',
            lastQuery: '',
            allowBlank: true,
            itemId:'language',
            displayField: '_Language',
            valueField: 'Language'
        },
        {
            xtype: 'combo',
            store:[
                [0, getLocale('Central')],
                [1, getLocale('Dealer')],
                [2, getLocale('Usuario final (AWCC)')]
                
                /**[11, PERFILES] <- solo informativo*/
            ],
            editable: false,
            queryMode: 'local',
            fieldLabel: 'Tipo',
            lastQuery: '',
            allowBlank: true,
            itemId:'tipousuario',
            value: 2,
            name:'udw_tipo'
        },{
            xtype : 'combo',
			fieldLabel : 'Controla Ip',
			name : '_controlaIp',
            itemId: '_controlaIp',
			store : 'SiNoStore',
			displayField : 'Name',
			valueField : 'Value',
            margin: '5 0 5 0',
            queryMode: 'local',
            anchor: '20%'
		},
        {
            xtype: 'combo',
            store:[
                [0, getLocale('Habilitado')],
                [1, getLocale('Deshabilitado')]
            ],
            queryMode: 'local',
            fieldLabel: 'Estado',
            lastQuery: '',
            allowBlank: true,
            itemId:'udw_estado',
            value: 0,
            name:'udw_estado'
        },{
            xtype:'perfilfield',
            simpleSelect: true,
            title: 'Seleccione un perfil',
            itemId:'perfil',
            hidden: true // no mostrar el perfil hasta que no se guarda (DEDALO 1/8/2018)
            
        }
    ],
    initComponent : function() {
    	this.callParent(arguments);
        
        
         var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            items: [
                {
                    text: 'Guardar',
                    iconCls: 'save',
                    action: 'save'
                },
                {
                    text: 'Eliminar',
                    iconCls: 'delete',
                    itemId:'delete',
                    action: 'delete'
                },{
                    text: 'Cerrar sesión',
                    iconCls: 'icon-door-out',
                    action: 'cerrarsesion',
                    itemId: 'cerrarsesion'
                },{
                    text: 'Enviar datos al mail',
                    iconCls: 'icon-email-go',
                    action: 'enviardatos',
                    itemId: 'enviardatos'
                },{
                    itemId:'verperfil',
                    iconCls: 'icon-user-gray',
                    text:'Ver permisos',
                    hidden:true
                }
            ]// cierro items
         }); 
        
        this.addDocked(toolbar);
	} // cierro init
});