Ext.define('SgAppAccessControl.view.AC_accesoProveedorIdentificacionView', {
	extend: 'Ext.form.Panel',
	alias: ['widget.ac_accesoproveedoridentificacionview'],
	border: 0,
	bodyPadding: 0,
	items: [    
        {
            xtype: 'container',
            layout:'column',
            items:[
                {
                    columnWidth:'0.25',
                    xtype: 'image',
                    //src: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMjMuNSA3Yy4yNzYgMCAuNS4yMjQuNS41di41MTFjMCAuNzkzLS45MjYuOTg5LTEuNjE2Ljk4OWwtMS4wODYtMmgyLjIwMnptLTEuNDQxIDMuNTA2Yy42MzkgMS4xODYuOTQ2IDIuMjUyLjk0NiAzLjY2NiAwIDEuMzctLjM5NyAyLjUzMy0xLjAwNSAzLjk4MXYxLjg0N2MwIC41NTItLjQ0OCAxLTEgMWgtMS41Yy0uNTUyIDAtMS0uNDQ4LTEtMXYtMWgtMTN2MWMwIC41NTItLjQ0OCAxLTEgMWgtMS41Yy0uNTUyIDAtMS0uNDQ4LTEtMXYtMS44NDdjLS42MDgtMS40NDgtMS4wMDUtMi42MTEtMS4wMDUtMy45ODEgMC0xLjQxNC4zMDctMi40OC45NDYtMy42NjYuODI5LTEuNTM3IDEuODUxLTMuNDUzIDIuOTMtNS4yNTIuODI4LTEuMzgyIDEuMjYyLTEuNzA3IDIuMjc4LTEuODg5IDEuNTMyLS4yNzUgMi45MTgtLjM2NSA0Ljg1MS0uMzY1czMuMzE5LjA5IDQuODUxLjM2NWMxLjAxNi4xODIgMS40NS41MDcgMi4yNzggMS44ODkgMS4wNzkgMS43OTkgMi4xMDEgMy43MTUgMi45MyA1LjI1MnptLTE2LjA1OSAyLjk5NGMwLS44MjgtLjY3Mi0xLjUtMS41LTEuNXMtMS41LjY3Mi0xLjUgMS41LjY3MiAxLjUgMS41IDEuNSAxLjUtLjY3MiAxLjUtMS41em0xMCAxYzAtLjI3Ni0uMjI0LS41LS41LS41aC03Yy0uMjc2IDAtLjUuMjI0LS41LjVzLjIyNC41LjUuNWg3Yy4yNzYgMCAuNS0uMjI0LjUtLjV6bTIuOTQxLTUuNTI3cy0uNzQtMS44MjYtMS42MzEtMy4xNDJjLS4yMDItLjI5OC0uNTE1LS41MDItLjg2OS0uNTY2LTEuNTExLS4yNzItMi44MzUtLjM1OS00LjQ0MS0uMzU5cy0yLjkzLjA4Ny00LjQ0MS4zNTljLS4zNTQuMDYzLS42NjcuMjY3LS44NjkuNTY2LS44OTEgMS4zMTUtMS42MzEgMy4xNDItMS42MzEgMy4xNDIgMS42NC4zMTMgNC4zMDkuNDk3IDYuOTQxLjQ5N3M1LjMwMS0uMTg0IDYuOTQxLS40OTd6bTIuMDU5IDQuNTI3YzAtLjgyOC0uNjcyLTEuNS0xLjUtMS41cy0xLjUuNjcyLTEuNSAxLjUuNjcyIDEuNSAxLjUgMS41IDEuNS0uNjcyIDEuNS0xLjV6bS0xOC4yOTgtNi41aC0yLjIwMmMtLjI3NiAwLS41LjIyNC0uNS41di41MTFjMCAuNzkzLjkyNi45ODkgMS42MTYuOTg5bDEuMDg2LTJ6Ii8+PC9zdmc+',
                    src: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMTkgNy4wMDFjMCAzLjg2NS0zLjEzNCA3LTcgN3MtNy0zLjEzNS03LTdjMC0zLjg2NyAzLjEzNC03LjAwMSA3LTcuMDAxczcgMy4xMzQgNyA3LjAwMXptLTEuNTk4IDcuMThjLTEuNTA2IDEuMTM3LTMuMzc0IDEuODItNS40MDIgMS44Mi0yLjAzIDAtMy44OTktLjY4NS01LjQwNy0xLjgyMi00LjA3MiAxLjc5My02LjU5MyA3LjM3Ni02LjU5MyA5LjgyMWgyNGMwLTIuNDIzLTIuNi04LjAwNi02LjU5OC05LjgxOXoiLz48L3N2Zz4=',
                    //minHeight: '300',
                    //maxHeight:200,
                    //minWidth:'200',
                    //maxWidth:200,
                    name: 'Photo',
                    itemId: 'Photo'
                },{
                    columnWidth:'0.75',
                    xtype:'container',
                    
                    bodyStyle:{"background-color":"lightgrey"},
                    layout:'vbox',
                    items:[
                        {
                            xtype:'panel',
                            width:'100%',
                            height:'200',
                            //bodyStyle:{"background-color":"lightgrey"},
                            items:[
                                {
                                    xtype:'container',
                                    layout:'column',
                                    
                                    items:[
                                        {
                                            xtype:'container',
                                            columnWidth:'0.50',
                                            items:[
                                                {
                                                    xtype:'panel',
                                                    bodyStyle:{"background-color":"lightgrey"}, 
                                                    padding:'5,5,5,5',
                                                    items:[
                                                        {
                                                            xtype: 'displayfield',
                                                            fieldLabel: 'Nombre',
                                                            labelAlign:'top',
                                                            name: 'apr_cNombre',
                                                            itemId: 'apr_cNombre',
                                                            fieldStyle:"font-size:15px!important;font-weight: bold!important;" 
                                                        }
                                                    ]                                  
                                                },
                                                
                                                {
                                                    xtype:'panel',
                                                    bodyStyle:{"background-color":"lightgrey"}, 
                                                    padding:'5,5,5,5',
                                                    items:[
                                                        {
                                                            xtype: 'displayfield',
                                                            fieldLabel: 'Dirección',
                                                            labelAlign:'top',
                                                            name: 'apr_cDireccion',
                                                            fieldStyle:"font-size:15px!important;font-weight: bold!important;" ,
                                                            itemId: 'apr_cDireccion'  
                                                        }
                                                    ]                                  

                                                },{
                                                    
                                                        xtype:'panel',
                                                        padding:'5,5,5,5',
                                                        bodyStyle:{"background-color":"lightgrey"}, 
                                                        items:[
                                                            {
                                                                xtype: 'displayfield',
                                                                
                                                                fieldLabel: 'Categoría',
                                                                labelAlign:'top',
                                                                fieldStyle:"font-size:15px!important;font-weight: bold!important;" ,
                                                                name: 'acp_cDescripcion',
                                                                itemId: 'acp_cDescripcion'  
                                                            }
                                                        ]                                  
                                                }
                                            ]
                                        },{
                                            
                                                xtype:'container',
                                                columnWidth:'0.50',
                                                items:[
                                                    {
                                                    
                                                        xtype:'panel',
                                                        padding:'5,5,5,5',
                                                        bodyStyle:{"background-color":"lightgrey"}, 
                                                        items:[
                                                            {
                                                                xtype: 'displayfield',
                                                                
                                                                fieldLabel: 'Identificación',
                                                                fieldStyle:"font-size:15px!important;font-weight: bold!important;" ,
                                                                labelAlign:'top',
                                                                name: 'apr_cIdentificacion',
                                                                itemId: 'apr_cIdentificacion'  
                                                            }
                                                        ]                                    
                                                    },{
                                                    
                                                        xtype:'panel',
                                                        padding:'5,5,5,5',
                                                        bodyStyle:{"background-color":"lightgrey"}, 
                                                        items:[
                                                            {
                                                                xtype: 'displayfield',
                                                                fieldStyle:"font-size:15px!important;font-weight: bold!important;",
                                                                fieldLabel: 'Teléfono',
                                                                labelAlign:'top',
                                                                name: 'apr_cTelefono',
                                                                itemId: 'apr_cTelefono'  
                                                            }
                                                        ]                                       
                                                    },{
                                                    
                                                        xtype:'panel',
                                                        padding:'5,5,5,5',
                                                        bodyStyle:{"background-color":"lightgrey"}, 
                                                        items:[
                                                            {
                                                                xtype: 'displayfield',
                                                                fieldStyle:"font-size:15px!important;font-weight: bold!important;",
                                                                fieldLabel: 'Operativo',
                                                                labelAlign:'top',
                                                                name: '_apr_iStatus',
                                                                itemId: '_apr_iStatus'  
                                                            }
                                                        ]  
                                                    }
                                                ]                            
                                        }
                                    ]
                                }

                            ]                   
                        },
                        {
                            xtype:'panel',
                            width:'100%',
                            
                            bodyStyle:{"background-color":"lightgrey"},
                            items:[
                                {
                                    xtype:'displayfield',
                                    fieldStyle:"font-size:15px!important;font-weight: bold!important;" ,
                                    fieldLabel:'Observaciones',
                                    labelAlign:'top',
                                    name:'apr_cObservaciones'
                                },

                            ]                   
                        }


                                              
                    ]
                }
            ]   
        }
        
    ],
    initComponent: function () {
        this.callParent();
        
	}
})