/**
 * Created by tim on 17-8-16.
 */

$(() => {

    var Province = {},
        city = {},
        district = {},
        options = '',
        $Province = $('#Province'),
        $City = $('#city'),
        $District = $('#district');

    $.getJSON('data.json', function (data) {

        for (let key in data['86']) {

            Province[key] = data['86'][key];

            options += '<option value="' + key + '">' + Province[key] + '</option>';

        }

        for (let key in data) {
            for (let n in data['86']) {
                if (key == n) {
                    city[key] = data[key];
                }
            }
        }

        for (let key in data) {
            for (let i in city) {
                for (let n in city[i]) {
                    if (key == n) {
                        district[key] = data[key];
                    }
                }
            }
        }

        for (let key in Province) {

            options += '<option value="' + key + '">' + Province[key] + '</option>';

        }


        $(options).appendTo($Province);

        // linkage($Province,$City);
        // linkage($City,$District);

        linkage('#Province', '#city');

        linkage('#city', '#district');

        options = '';

        // alert($('#Province').find('option:selected').val());

        $Province.change(() => {

            linkage('#Province', '#city');

            // linkage('#city', '#district');

            // linkage($Province,$City);

            // linkage($City,$District);

        });


        $City.change(() => {

            linkage('#city', '#district');

            // linkage($City,$District);
        });

        //联动函数
        function linkage(main, follow) {

            let value = $(main).find('option:selected').val();


            if (main === '#Province') {
                for (let key in city) {

                    options = '';
                    $(follow).empty();

                    if (key == value) {
                        for (let n in city[value]) {
                            options += '<option value="' + n + '">' + city[value][n] + '</option>';
                        }

                        $(options).appendTo($(follow));

                        break;
                    }
                }

                linkage('#city', '#district');

            } else {
                for (let key in district) {

                    options = '';

                    $(follow).empty();

                    if (key == value) {

                        for (let n in district[value]) {
                            options += '<option value="' + n + '">' + district[key][n] + '</option>';
                        }

                        $(options).appendTo($(follow));

                        break;
                    }
                }
            }


            // for (let key in data) {
            //
            //     follow.empty();
            //     options = '';
            //
            //     if (key == value) {
            //
            //         for (let key in data[value]) {
            //
            //             city[key] = data[value][key];
            //             options += '<option value="' + key + '">' + city[key] + '</option>';
            //
            //         }
            //
            //         $(options).appendTo(follow);
            //
            //         break;
            //     }
            //
            // }

        }


        // $('#Province').on('selected','option',function(){
        //
        //     alert(1);
        //
        //     let value = $(this).val();
        //
        //     alert(value);
        //
        // });

    });
});
