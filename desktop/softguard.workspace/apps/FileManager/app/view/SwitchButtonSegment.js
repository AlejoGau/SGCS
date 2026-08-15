Ext.define('FileManager.view.SwitchButtonSegment', {
    extend: 'Ext.container.Container', // Updated for Ext JS 7.1
    alias: 'widget.switchbuttonsegment',

    layout: {
        type: 'hbox',
        align: 'stretch'
    },

    config: {
        activeItem: 0
    },

    initComponent: function () {
        this.callParent(arguments);
        this.initButtons();
    },

    initButtons: function () {
        this.items.each(function (item, index) {
            item.enableToggle = true;
            item.toggleGroup = this.getId();
            item.pressed = index === this.activeItem;

            item.on('toggle', function (btn, pressed) {
                if (pressed) {
                    this.setActiveItem(index);
                }
            }, this);
        }, this);
    },

    setActiveItem: function (index) {
        this.activeItem = index;
        this.fireEvent('change', this, index);
    }
});