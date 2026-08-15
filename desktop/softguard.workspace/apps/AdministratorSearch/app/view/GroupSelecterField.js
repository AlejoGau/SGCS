Ext.define('AdministratorSearch.view.GroupSelecterField', {
    extend : 'Ext.form.FieldSet',
    alias : 'widget.groupselecterfield',
    title : 'Grupo',
    ignoreDirty: true,
    autoHeight : true,
    layout: {
        type: 'hbox',
        align: 'stretch'
    },
    width:'100%',
    getValue: function () {
        console.log(this)
        return this.down('#codgrupo').getValue()
    },
    setValue: function (values) {
        console.log(values)
        var view = this;
        
        
        if(values == '' ) {
            view.down('#codgrupo').setValue('');
            view.down('#nombregrupo').setValue('');
            view.down('#deleteGroup').hide();        
            return false;
        }
        var codigos = values.split(',')
        
        if(codigos.length == 1) {
            
            var codigoalarmaStore  =Ext.create('Ext.data.Store',{
                model: 'AdministratorSearch'+'.model.SoftguardGruposModel',
                pageSize: 1000,
                remoteSort: false,
                remoteFilter: true,
                filters: [{
                    property:'gru_ccodigo',
                    value: codigos[0]
                }],
                remoteFilter: true,
                sorters: [
                        { 
                            property: 'gru_ccodigo',
                            direction:'ASC'
                        }
                    ]
            })
            
            codigoalarmaStore.load({callback:function (records) {
                if(records.length > 0) {
                   view.down('#deleteGroup').show()                    
                   view.down('#nombregrupo').setValue(records[0].get('descriptionCalc'))
                }
            }})
            
            
            
        } else if(codigos.length > 1) {
            view.down('#nombregrupo').setValue(codigos.join(','))
            view.down('#deleteGroup').show()
        } else {
            view.down('#deleteGroup').hide()
        }
        
        this.down('#codgrupo').setValue(codigos.join(','))
    },
    padding:'0 5 5 5',
    items : [
       {
            xtype:'button',
            itemId: 'grupo',
            text:'Seleccione un grupo',
            margin:'0 10 0 0'
        },{
            xtype:'button',
            itemId:'deleteGroup',
            iconCls: 'icon-cancel',
            margin:'0 5 0 0',
            hidden:true
        },{
            xtype:'displayfield',
            itemId:'nombregrupo',
            style: {
                wordBreak: 'break-word',
                wordWrap: 'break-word'
            }
        },{
            xtype:'displayfield',
            itemId:'codgrupo',
            hidden:true
        }
    ],
    
    
    
    initComponent: function () {
        this.callParent(arguments);
        this.addGroups('selectedGroups');        
        
        if(this.title!= '') {
            this.setTitle(this.title)
        }  
    } // cierro init
});