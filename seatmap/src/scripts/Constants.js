Constants = {
    editor : {
        bgColor : '#333'
    },
    selection: {
        'level': '#d60',
        'section': '#ba0',
        'row': '#0a0',
        'picture': '#d60',
        'label': '#d60'
    },
    seat : {
        spacing : 32,
        size : 24,
        seatColor : '#26b',
        levelColor : '#d60',
        sectionColor : '#ba0',
        rowColor : '#0a0',
        geometry : 'Rect'
    },
    preset : {
        version : 3,
        alpha : 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        visibility : {
            /*
             * image: true, label: true, levelName: true, sectionName: true,
             * rowName: false,
             */
            seatName : true,
            rowName : true,
            editorPolygons : true,
            autoUpdate : true
        }
    }
};

Constants.seat.pad = Constants.seat.spacing - Constants.seat.size;
