Ext.define('Desktop.DesktopClock', {
    extend: 'Ext.form.Panel',

    alias: 'widget.desktopclock',

    cls: 'ux-desktop-desktopclock',

    html: '&#160;',

    timeFormat: 'G:i',

    tpl: '{time}',
    frame: false,
    border: false,
    bodyStyle: 'background:transparent;',
    
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    
    items: [{
            xtype: 'displayfield',
            itemId: 'dayofweek',
            cls: 'ux-desktopclock-dayofweek',
            fieldStyle: 'text-align: right;'
        },{
            xtype: 'displayfield',
            itemId: 'date',
            cls: 'ux-desktopclock-date',
            fieldStyle: 'text-align: right;'
        },{
            xtype: 'displayfield',
            itemId: 'time',
            cls: 'ux-desktopclock-time',
            fieldStyle: 'text-align: right;'
        }
    ],

    initComponent: function () {
        var me = this;

        me.callParent();
        
        me.timectrl = me.down('#time');
        me.datectrl = me.down('#date');
        me.dayofweekctrl = me.down('#dayofweek');

        if (typeof(me.tpl) == 'string') {
            me.tpl = new Ext.XTemplate(me.tpl);
        }
    },

    afterRender: function () {
        var me = this;
        Ext.Function.defer(me.updateTime, 100, me);
        me.callParent();
        //---------------------------

        if ((typeof window.orientation !== "undefined") 
                || (navigator.userAgent.indexOf('IEMobile') !== -1)) {
            //me.down('#date').cls='ux-desktopclock-date-mobile';
            me.down('#date').hide();
            me.down('#time').hide();
            me.down('#dayofweek').hide();
        }
        //--------------------------------        
    },

    onDestroy: function () {
        var me = this;

        if (me.timer) {
            window.clearTimeout(me.timer);
            me.timer = null;
        }

        me.callParent();
    },

    updateTime: function () {
        var me = this, 
            time = Ext.Date.format(new Date(), me.timeFormat),
            timetxt = me.tpl.apply({ time: time }),
            dayofweek = Ext.Date.format(new Date(), 'l'),
            date = Ext.Date.format(new Date(), 'd F');
        if (me.lastTime != timetxt) {
            me.timectrl.setValue(timetxt);
            me.lastTime = timetxt;
            me.dayofweekctrl.setValue(dayofweek);
            //date = date.replace('ç','&Ccedil;')
            
            me.datectrl.setValue(date);
        
        }

        me.timer = Ext.Function.defer(me.updateTime, 10000, me);
    }
});
