Ext.define('Administrator.model.KeyModulesModel', {
    extend: 'Ext.data.Model',
    idProperty: 'Module',
    fields: [
        {
        name: 'Dependencies',
        type: 'string'
        },
        {
        name: 'DisplayGrayIcons',
        type: 'boolean',
        defaultValue: true
        },
        {
        name: 'WebMonRanges',
        type: 'string'
        
        },
        
        {
        name: 'IsPerpetual',
        type: 'boolean',
        defaultValue: false
        },
		{name:'Module',type:'string'},
        {name:'QuantityOfUsers',type:'int',defaultValue:0},
        {name:'DueDate',type:'date'},//, dateFormat:'MS'
        {name:'_localeModule', type: 'string', convert:function(v, record){
            return record.get('Module');
            //return getLocale(record.get('Module'))
        }}
        ],
		
    proxy: {
		type : 'rest',
		url : '/Rest/Security/KeyModules',
		appendId : false
	},
    
    isDependency: function(name){
        var dependencies = this.get('Dependencies').toLowerCase().split(/,/g);
        
        if (Ext.Array.contains(dependencies,name.toLowerCase())){
            return true;
        } else{
            //console.log(dependencies, name.toLowerCase());
            return false;
        }
        
    }
});