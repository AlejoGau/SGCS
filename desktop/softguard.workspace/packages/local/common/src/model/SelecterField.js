Ext.define('Common.view.SelecterField', {
    extend : 'Ext.form.FieldSet',
    alias : 'widget.selecterfield',
    ignoreDirty: true,
    autoHeight : true,
    layout: {
        type: 'hbox',
        align: 'stretch'
    },
    padding:'5',
    width:'100%',
    
    setDisabledNew: function (state) {
        if(state) {
            this.disableNew = true
        } else {
            this.disableNew = false;            
        }
    },
    
    setDisabled: function (state) {
        this.down('#deleteEvent').hide()//setDisabled(state)
        this.down('#evento').hide()//setDisabled(state)
        this.disabled = state
    },
    
    getValue: function () {
        console.log(this)
        return this.down('#codevento').getValue()
    },
    getRawValue: function () {
        console.log(this)
        return this.down('#codevento').getRawValue()
    },
    setValue: function (values) {
    //var modelGrid = Ext.ModelManager.getModel('Common.model.selecterModel')
    var modelGrid = Common.model.selecterModel;
    //const modelGrid = CommonModelManager.getModel('Common.model.selecterModel');

        //console.log(this)
        var view = this;
        
        this.values = values.toString().trim();
        var gridStore = view.down('#gridname').getStore();
        gridStore.removeAll();
        
        if(this.values == '' ) {
            view.down('#deleteEvent').hide()        
           // view.down('#nombreevento').setValue('')
            view.down('#codevento').setValue('')
            return false;
        }
        var values = values.toString().split(',')
        
        if(values.length > 0) {
            if(!view.config.valueFieldFilter) {
                view.config.valueFieldFilter = '';
            }
            
            var valueField = view.config.valueField
            if(view.config.prefijoParaFiltro) {
               valueField = view.config.prefijoParaFiltro+'.'+valueField
            } 
            var Store  =Ext.create('Ext.data.Store',{
                model: view.config.modelItems,
                pageSize: 1000,
                remoteSort: false,
                remoteFilter: true,
                filters: [{
                    property:valueField+view.config.valueFieldFilter,
                    value: values.join(',')
                }],
                remoteFilter: true
            })
            
            Store.load({callback:function (records) {
                if(records && records.length > 0) {
                    
                   if(view.disabled != true) {
                        view.down('#deleteEvent').show()
                   }
                   var selected = [];                   
                   records.map(function (rec) {  
                       gridStore.add(modelGrid.create({name:rec.get(view.config.selecionado.field)}))
                   })

                   view.fireEvent('change',view,records)   
                }
                
            }})
            
        } else if(values.length > 1) {
            view.down('#nombreevento').setValue(values.join(','))
            if(view.disabled != true) {
                view.down('#deleteEvent').show()
            }
        } else {
            view.down('#deleteEvent').hide()
        }
        
        this.down('#codevento').setValue(values.join(','))

    },
    items : [
       {
            xtype:'button',
            itemId: 'evento',
            text:'Seleccione',
            margin:'0 10 0 0',
            height:30
        },{
            xtype:'button',
            itemId:'deleteEvent',
            iconCls: 'icon-cancel',
            margin:'0 5 0 0',
            hidden:true,
            height:30
        }/*,{
            xtype:'displayfield',
            itemId:'nombreevento',
            cls: 'text-wrapper'
        }*/,{
            xtype:'grid',
            itemId:'gridname',
            header:false,
            hideHeaders:true,
            columns:[{
                xtype : 'gridcolumn',
                dataIndex : 'name',
                flex: 1
            }],
            maxHeight:200,
            autoScroll: true,
            flex: 1            
        },{
            xtype:'displayfield',
            itemId:'codevento',
            hidden:true
        }
    ],

    initComponent: function () {
        this.callParent(arguments);

        
        if(this.title!= '') {
            this.setTitle(this.title)
        }

        var store =Ext.create('Ext.data.Store',{            
            model: 'Common.model.selecterModel',
            pageSize: 99999            
        });
        
        this.down('#gridname').bindStore(store);

    } // cierro init
});