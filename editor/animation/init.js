//Dont change it
requirejs(['ext_editor_1', 'jquery_190', 'raphael_210', 'snap.svg_030'],
    function (ext, $, Raphael, Snap) {

        var cur_slide = {};

        ext.set_start_game(function (this_e) {
        });

        ext.set_process_in(function (this_e, data) {
            cur_slide = {};
            cur_slide["in"] = data[0];
            this_e.addAnimationSlide(cur_slide);
        });

        ext.set_process_out(function (this_e, data) {
            cur_slide["out"] = data[0];
        });

        ext.set_process_ext(function (this_e, data) {
            cur_slide.ext = data;
        });

        ext.set_process_err(function (this_e, data) {
            cur_slide['error'] = data[0];
            this_e.addAnimationSlide(cur_slide);
            cur_slide = {};
        });

        ext.set_animate_success_slide(function (this_e, options) {
            var $h = $(this_e.setHtmlSlide('<div class="animation-success"><div></div></div>'));
            this_e.setAnimationHeight(115);
        });

        ext.set_animate_slide(function (this_e, data, options) {
            var $content = $(this_e.setHtmlSlide(ext.get_template('animation'))).find('.animation-content');
            if (!data) {
                console.log("data is undefined");
                return false;
            }

            //YOUR FUNCTION NAME
            var fname = 'lanterns_flow';

            var checkioInput = data.in || [
                ["X.X", "X.X", "X.X"],
                0
            ];
            var checkioInputStr = fname + '(' + JSON.stringify(checkioInput[0]).replace("[", "(").replace("]", ")") + ", "
                + checkioInput[1] + ')';

            var failError = function (dError) {
                $content.find('.call').html(checkioInputStr);
                $content.find('.output').html(dError.replace(/\n/g, ","));

                $content.find('.output').addClass('error');
                $content.find('.call').addClass('error');
                $content.find('.answer').remove();
                $content.find('.explanation').remove();
                this_e.setAnimationHeight($content.height() + 60);
            };

            if (data.error) {
                failError(data.error);
                return false;
            }

            if (data.ext && data.ext.inspector_fail) {
                failError(data.ext.inspector_result_addon);
                return false;
            }

            $content.find('.call').html(checkioInputStr);
            $content.find('.output').html('Working...');

            var svg = new RiverSvg($content.find(".explanation svg")[0]);
            svg.prepare(checkioInput[0]);

            if (data.ext) {
                var rightResult = data.ext["answer"];
                var userResult = data.out;
                var result = data.ext["result"];
                var result_addon = data.ext["result_addon"];

                //if you need additional info from tests (if exists)
                var explanation = data.ext["explanation"];
                $content.find('.output').html('&nbsp;Your result:&nbsp;' + JSON.stringify(userResult));
                if (!result) {
                    $content.find('.answer').html('Right result:&nbsp;' + JSON.stringify(rightResult));
                    $content.find('.answer').addClass('error');
                    $content.find('.output').addClass('error');
                    $content.find('.call').addClass('error');
                }
                else {
                    $content.find('.answer').remove();
                }

                svg.ext(explanation[0]);
            }
            else {
                $content.find('.answer').remove();
            }


            //Your code here about test explanation animation
            //$content.find(".explanation").html("Something text for example");
            //
            //
            //
            //
            //


            this_e.setAnimationHeight($content.height() + 60);

        });

        //This is for Tryit (but not necessary)
//        var $tryit;
//        ext.set_console_process_ret(function (this_e, ret) {
//            $tryit.find(".checkio-result").html("Result<br>" + ret);
//        });
//
//        ext.set_generate_animation_panel(function (this_e) {
//            $tryit = $(this_e.setHtmlTryIt(ext.get_template('tryit'))).find('.tryit-content');
//            $tryit.find('.bn-check').click(function (e) {
//                e.preventDefault();
//                this_e.sendToConsoleCheckiO("something");
//            });
//        });
        function RiverSvg(dom) {


            var colorOrange4 = "#F0801A";
            var colorOrange3 = "#FA8F00";
            var colorOrange2 = "#FAA600";
            var colorOrange1 = "#FABA00";

            var colorBlue4 = "#294270";
            var colorBlue3 = "#006CA9";
            var colorBlue2 = "#65A1CF";
            var colorBlue1 = "#8FC7ED";

            var colorGrey4 = "#737370";
            var colorGrey3 = "#9D9E9E";
            var colorGrey2 = "#C5C6C6";
            var colorGrey1 = "#EBEDED";

            var colorWhite = "#FFFFFF";

            var p = 1;

            var paper;
            var cell;

            var sizeX = 380 + p * 2;
            var sizeY;

            var back;

            var attrCell = {stroke: colorBlue4, strokeWidth: 2, fillOpacity: 0};

            this.prepare = function (map) {
                paper = Snap(dom);
                var height = map.length;
                var width = map[0].length;
                cell = sizeX / width;
                sizeY = p * 2 + cell * height;
                paper.attr({width: sizeX, height: sizeY, background: colorBlue1});

                cell = (sizeX - 2 * p) / map[0].length;

                attrCell.strokeWidth = cell < 20 ? 1 : 2;

                back = paper.rect(p, p, Math.floor(sizeX - 2 * p), Math.floor(sizeY - 2 * p)).attr(
                    {strokeWidth: 0, fill: colorBlue1});

                for (var i = 0; i < map.length; i++) {
                    for (var j = 0; j < map[i].length; j++) {
                        var r = paper.rect(p + j * cell, p + i * cell, cell, cell).attr(attrCell);
                        if (map[i][j] === "X") {
                            r.attr({fill: colorGrey4, fillOpacity: 1});
                        }
                    }
                }
            };

            this.ext = function (lmap) {
                for (var i = 0; i < lmap.length; i++) {
                    for (var j = 0; j < lmap[i].length; j++) {
                        if (lmap[i][j] === "0") {
                            paper.circle(p + cell * (j + 0.5), p + cell * (i + 0.5), cell * 0.4).attr(
                                {stroke: colorBlue4, strokeWidth: attrCell.strokeWidth, fill: colorOrange2});
                        }
                        if (lmap[i][j] === "0" || lmap[i][j] === "*") {
                            var lr = paper.rect(p + j * cell, p + i * cell, cell, cell).attr(
                                {strokeWidth: 0, fill: colorOrange1}
                            );
                            lr.insertAfter(back);
                        }
                    }
                }
            }

        }

        //Your Additional functions or objects inside scope
        //
        //
        //


    }
);
