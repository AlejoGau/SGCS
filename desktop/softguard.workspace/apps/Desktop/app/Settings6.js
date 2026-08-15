Ext.define('Desktop.Settings6', {
    extend: 'Ext.window.Window',
    uses: [
        'Ext.tree.Panel',
        'Ext.tree.View',
        'Ext.form.field.Checkbox',
        'Ext.layout.container.Anchor',
        'Ext.layout.container.Border',
        'Ext.ux.desktop.Wallpaper',
        'Desktop.model.WallpaperModel'
    ],
    layout: 'anchor',
    //title: 
    modal: true,
    width: 640,
    height: 480,
    border: false,

    initComponent: function () {
        this.title = getLocale('Preferencias');
        var me = view = this;

        me.selected = me.desktop.getWallpaper();
        me.stretch = me.desktop.wallpaper.stretch;
        me.preview = Ext.create('widget.wallpaper');
        me.preview.setWallpaper(me.selected);
        me.tree = me.createTree();

        me.buttons = [
            { text: getLocale('Guardar'), handler: me.onOK, scope: me },
            { text: getLocale('Cancelar'), handler: me.close, scope: me }
        ];

        me.items = [
            {
                xtype: 'container',
                anchor: '0 -30',
                border: false,
                layout: 'border',
                items: [
                    {
                        xtype: 'panel',
                        region: 'west',
                        width:150,
                        layout: {
                            // layout-specific configs go here
                            type: 'accordion',
                            titleCollapse: false,
                            animate: true
                        },
                        items: [
                            {
                                xtype: 'treepanel',
                                title: getLocale('Mis fondos'),
                                itemId: 'mywallpapertree',
                                collapsed: false,
                                rootVisible: false,
                                lines: false,
                                store: new Ext.data.TreeStore({
                                    model: 'Desktop.model.WallpaperModel',
                                    root: {
                                        text:'Wallpaper',
                                        expanded: true,
                                        children:[]
                                    }
                                }),
                                listeners: {
                                    afterrender: { fn: this.setInitialSelection, delay: 100 },
                                    select: this.onSelect,
                                    scope: me
                                }
                            },me.tree
                        ]
                        //items: [me.tree]
                    },
                    {
                        xtype: 'panel',
                        title: getLocale('Vista previa'),
                        region: 'center',
                        layout: 'fit',
                        items: [ me.preview ]
                    }
                ]
            },
            {
                xtype: 'checkbox',
                boxLabel: getLocale('Ajustar a la pantalla'),
                checked: me.stretch,
                listeners: {
                    change: function (comp) {
                        me.stretch = comp.checked;
                    }
                }
            }
        ];

        me.callParent();
        
        // cargo el tree con los fondos de la organizacion del usuario
        Ext.Ajax.request({
            url : '/Rest/desktop/wallpapers?id='+desktopData.infoUser.OrganizationId,
            failure: function(r,o){
                // ocultar el panel
                var mytree = view.down('#mywallpapertree');
                mytree.hide();
                me.tree.expand();
            },
            success: function(response, action){
                try{
                    var myWallpapers = Ext.JSON.decode(response.responseText);
                    var mytree = view.down('#mywallpapertree');
                    var _children =  [];
                    Ext.Array.each(myWallpapers, function(_wp){
                        _children.push(
                            {
                                text:_wp
                                ,leaf: true
                                ,iconCls: ''
                                ,img:desktopData.infoUser.OrganizationId+'/'+_wp
                            }
                        );
                    })

                    mytree.setRootNode({
                        text: 'Root',
                        expanded: true,
                        children: _children
                    });
                    
                    /*
                    var root = mytree.getRoot();
                    */
                }
                catch (error){
                    console.log(error);
                    // ocultar el panel
                }
            },
            scope:this
        });
    },

    createTree : function() {
        var me = this;

        function child (img) {
            return { img: img, text: me.getTextOfWallpaper(img), iconCls: '', leaf: true };
        }
        
        //inicio
        var childs = [{ text: "None", iconCls: '', leaf: true }];
        //genero childs
        Ext.each(me.wallpapers, function(row, position, allrows){
            childs.push(child (row));
        });
		 
        var tree = new Ext.tree.Panel({
            title: getLocale('Fondos globales'),
            rootVisible: false,
            itemId: 'global',
            lines: false,
            listeners: {
                afterrender: { fn: this.setInitialSelection, delay: 100 },
                select: this.onSelect,
                scope: me
            },
            store: new Ext.data.TreeStore({
                model: 'Desktop.model.WallpaperModel',
                root: {
                    text:'Wallpaper',
                    expanded: true,
                    children:childs
                }
            })
        });

        return tree;
    },

    getTextOfWallpaper: function (path) {
        var text = path, slash = path.lastIndexOf('/');
        if (slash >= 0) {
            text = text.substring(slash+1);
        }
        var dot = text.lastIndexOf('.');
        text = Ext.String.capitalize(text.substring(0, dot));
        text = text.replace(/[-]/g, ' ');
        return text;
    },

    onOK: function () {
        var me = this;
        
        if (me.selected) {
            me.desktop.setWallpaper(me.selected, me.stretch);
            
            // Al momento de guardar, debo mantener la metadata inicial del Desktop, si tengo de las Window debo mantenerlo y no blanquear con el PUT.
            var _desktopData = myDesktopApp.getDesktopMetaData();
            _desktopData.wallpaper = me.selected;
            
            //Guardo preferencias para este usuario
            Ext.Ajax.request({
                url : '/Rest/Security/Modules/8/MetaData',
                failure: function(r,o){
                    Ext.Msg.alert(getLocale('Error'), getLocale('No se han guardado las preferencias, por favor, intente nuevamente'));
                },
                method:'PUT',
                jsonData: Ext.encode(Ext.encode(_desktopData)),
                success: function(response, action){
                    Ext.Msg.alert(getLocale('Wallpaper'), getLocale('las preferencias se guardaron exitosamente'));
                },
                scope:this
            });
				
        }
        me.destroy();
    },

    onSelect: function (tree, record) {
        var me = this;

        if (record.data.img) {
            me.selected = '/desktop/wallpapers/' + record.data.img;
        } else {
            me.selected = Ext.BLANK_IMAGE_URL;
        }

        me.preview.setWallpaper(me.selected);
    },

    setInitialSelection: function () {
        var s = this.desktop.getWallpaper();
        if (s) {
            var path = '/Wallpaper/' + this.getTextOfWallpaper(s);
            this.tree.selectPath(path, 'text');
        }
    }
});

