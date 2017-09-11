/**
 * Created by tim on 17-8-14.
 */

$(function(){

    var search = $('#searchbox'); //查询框
    var Originval = []; //数据原始值
    var N = 10;//每页10条数据
    var Num;//获取当前页数

    function Pagination(max, min) {
        // var Tr = $('tr:not(:eq(0))');
        // Tr.hide();
        // $('tr:lt(' + max + ')').show();
        // $('tr:lt(' + min + ')').hide();
        // $('tr:lt('+max+'):gt('+min+')').show();
        var Tr = $('tr:not(:eq(0))');
        Tr.hide().slice(min,max).show();
    }

    function exePagination() {
        var pagination = $('.Fenye');

        $('#pagination').remove();//＋id

        pagination.append('<ul class="pagination" id="pagination"></ul>');
        var li = '';
        for (var i = 0; i < Math.ceil(data.length / N); i++) {
            li += '<li><a href="javascript:;">' + (i + 1) + '</a></li>';
        }
        $(li).appendTo($('#pagination'));

        for (let i = 1; i <= Math.ceil(data.length / N); i++) {
            $('li:nth-of-type(' + i + ')').click(function () {
                Pagination((i * N + 1), (i * N + 1 - N));
                Num = i;
            });
        }
    }

//动态分页
    $('#FenyeBtn').on('click', function () {

        $(this).hide();

        exePagination();

        $('li:nth-of-type('+ 1 +')').click();

    });


    //查询
    search.keyup(function () {
        var Tr = $('tr');
        Tr.hide()
            .filter(":contains('" + (   $(this).val()) + "')").show();
        Tr.eq(0).show();
        $('.p1').text('').text('*共' + (Tr.filter(":contains('" + ($(this).val()) + "')").length - 2) + "条数据");
        $('ul.pagination').hide();
        $('#FenyeBtn').show();
    });

//添加一条数据
    $('#submit').click(function () {

        var arr = [],
            Stunum = $('#XH').val(),
            Pscj = $('#Ps').val(),
            QKcj = $('#QK').val(),
            SYcj = $('#SY').val(),
            flag2 = true;

        for (var i = 0; i < data.length; i++) {
            if (Stunum == data[i][0]) {
                flag2 = false;
                alert('学生已存在。');
                break;
            }
        }

        arr[0] = Stunum;
        arr[1] = Pscj;
        arr[2] = QKcj;
        arr[3] = SYcj;


        if (check(arr) && flag2) {

            data.push(arr);

            var $appendNewData =$('tbody').append("<tr><td>" + data[data.length - 1][0] + "</td><td>" + data[data.length - 1][1] + "</td><td>" + data[data.length - 1][2] + "</td><td>" + data[data.length - 1][3] + "</td><td><button class='btn btn-default edit'>edit</button> <button class='btn btn-danger del'>Del</button></td></tr>");

            if ($appendNewData) {

                alert('添加成功。');

                $('.p1').text('').text('*共' + ($('tr').filter(":contains('" + search.val() + "')").length-1) +  "条数据");

                search.keyup();

            } else {
                alert('添加失败。');
            }

        }

    });


//通过事件委托完成表格里面各项点击事件
    $('tbody').on('click', '.del', function () { //删除
        var This = $(this),
            ThisPtr = This.parents('tr');

        ThisPtr.remove();

        //删除data中被delete的数据
        for (var i = 0; i < data.length; i++) {
            if (data[i][0] == ThisPtr.children("td:nth-of-type(1)").text()) {
                var arr1 = data.slice(0, i);
                var arr2 = data.slice(i + 1, data.length);
                data = arr1.concat(arr2);
            }
        }

        $('.p1').text('').text('*共' + ($('tr').filter(":contains('" + search.val() + "')").length - 1) + "条数据");

        if($('#FenyeBtn').css('display') == 'none'){exePagination();}
        else{}

        $('li:nth-of-type('+ Num +')').click();

    }).on('click', '.edit', function () { //编辑

        var This = $(this),
            ThisPtr = This.parents('tr'),
            ThisCtd = ThisPtr.children('td');

        This.siblings().remove();

        This.parents('td').append('<button class="btn btn-default undo">undo</button><button class="btn btn-primary update">update</button>');

        for (var i = 0; i < ThisCtd.length - 1; i++) {

            Originval[i] = ThisCtd.eq('' + i).text();

            ThisCtd.eq('' + i).text('').append('<input type="text" value="' + Originval[i] + '">');

        }

        This.remove();

    }).on('click', '.undo', function () { //撤销

        var This = $(this),
            ThisPtr = This.parents('tr'),
            ThisCtd = ThisPtr.children('td');

        This.siblings().remove();

        This.parents('td').append('<button class="btn btn-default edit">edit</button> <button class="btn btn-danger del">Del</button>');

        for (var i = 0; i < ThisCtd.length - 1; i++) {

            ThisCtd.eq('' + i).text(Originval[i] + '');

        }

        This.remove();

    }).on('click', '.update', function () {  //更新


        var This = $(this),
            ThisPtr = This.parents('tr'),
            ThisCtd = ThisPtr.children('td'),
            arr = [];

        for (var i = 0; i < ThisCtd.length - 1; i++) {

            arr[i] = ThisCtd.eq('' + i).children().val();

        }

        if (check(arr)) {

            for (var i = 0; i < ThisCtd.length - 1; i++) {

                ThisCtd.eq('' + i).text(Math.round(arr[i]) + '');

            }

            This.siblings().remove();

            This.parents('td').append('<button class="btn btn-default edit">edit</button> <button class="btn btn-danger del">Del</button>');

            This.remove();
        }

    });

    function check(arr) {

        var flag = true;

        var reg = /^\d+$/;

        for (var key in arr) {

            if (arr[key] == '') {
                alert('添加信息须输入数据(没有成绩则成绩为0).');
                flag = false;
                break;
            } else if (key == 0 && (arr[0].length < 10 || arr[0].length > 12)) {
                alert('输入的学号须为10～12位之间。');
                flag = false;
                break;
            } else if (key > 0 && (arr[key] < 0 || arr[key] > 100)) {
                alert('输入成绩须为0~100之间');
                flag = false;
                break;
            } else {
                var Isnum = reg.test(arr[key]);
                if (!Isnum) {
                    alert('输入数据须为数字');
                    flag = false;
                    break;
                }
            }
        }

        return flag;

    }

});
