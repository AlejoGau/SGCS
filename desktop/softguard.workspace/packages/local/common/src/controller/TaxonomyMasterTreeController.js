//MIGRADO2024
Ext.define('Common.controller.TaxonomyMasterTreeController', {
    extend: 'Ext.app.Controller',
            stores : [  ],
        	models : [ 'TaxonomyMasterTreeModel' ],
			views : [ 'TaxonomyMasterTreeView' ],
    init: function (config) {
        // genero los eventos
        this.control({
            // cargo datos antes de mostrar
            'taxonomiesmastertree': {
                beforeload: this.loadEvent,
                afterrender: this.initView,
                select: this.onSelect
            }
        });
    }, // cierro init
    
    initView: function(view){
        
    },
    loadEvent: function (store, operation, options) {
        operation.scope = store;
        return operation;
    },
    
    onSelect: function(selModel, record, index, options){
        this.uncheckChildren(record,this);
        this.uncheckParent(record,this);
        return true
    },
    
    uncheckChildren: function(node, controller){
        node.eachChild(function(child){
            child.set('checked', false);
            controller.uncheckChildren(child, controller)
        })
    },
    
    uncheckParent: function(node, controller){
        var parent = node.parentNode;
        if (parent){
            parent.set('checked', false);
            controller.uncheckParent(parent, controller)
        }
    }
});