$.getJSON('data/nalitchniki.json', function(nalitchniki) {
    $.getJSON('data/houses.json', function(houses) {
        var canvas = document.getElementById("canvasObj");
        var ctx = canvas.getContext('2d');

        var nalitchnik = nalitchniki[Math.floor(Math.random()*houses.length)];
        var nalitchnik_bbox = nalitchnik.Label.objects[0].bbox;
        var house = houses[Math.floor(Math.random()*houses.length)];

        var img_house = new Image();
        img_house.onload = function() {
        canvas.width = img_house.width;
        canvas.height = img_house.height;
        ctx.drawImage(img_house, 0, 0);

        var img_nalitchnik = new Image();
        img_nalitchnik.onload = function() {
            house.Label.Window.forEach(
            function(window) {
            var window_geo = window.geometry;
            console.debug(nalitchnik_bbox);
            var window_width =  window_geo[1].x - window_geo[0].x;
            var scale_x = window_width / nalitchnik_bbox.width;
            var window_height =  window_geo[3].y - window_geo[0].y;
            var scale_y = window_height / nalitchnik_bbox.height;

            ctx.drawImage(
                img_nalitchnik,
                window_geo[0].x - (nalitchnik_bbox.left * scale_x),
                window_geo[0].y - (nalitchnik_bbox.top * scale_y),
                img_nalitchnik.width * scale_x,
                img_nalitchnik.height * scale_y
            );
            }
        )
        }

        img_nalitchnik.src = nalitchnik["Labeled Data"];
        };

        img_house.src = house["Labeled Data"];
    })
})