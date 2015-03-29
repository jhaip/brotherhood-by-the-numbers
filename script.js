function setUpTangle () {

	Tangle.formats.format_nobrothers = function(value, max_num_bros) {
    	if (value == 0) { return "no"; }
    	return "" + value + " out of " + max_num_bros;
    };

    Tangle.formats.selectSemester = function(value) {
        return (value == 0) ? "Fall 2014" : "Spring 2015";
    }

    Tangle.formats.dollars_commas = function (value) {
        return "$" + value.round(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    Tangle.formats.empty = function(value) {
        return "";
    }

    Tangle.formats.semesterDrag = function(value) {
        var str = "";
        str += (2015+Math.floor(value/2)).toString();
        str += " ";
        str += (value % 2 == 0) ? "Spring" : "Fall";
        return str;
    }

    Tangle.formats.liveOnCampus = function(value) {
        var str = value.toString();
        str += (value == 1) ? " lives " : " live ";
        str += "on campus";
        return str;
    }

    Tangle.classes.v_if = {
        //initialize: function (element, options, tangle, variable) { ... },  // optional
        update: function (element, value) {
            if (element.hasClass("invertIf")) { value = !value; }
            element.setStyle("display", !value ? "none" : "initial");//(element.get("tag") == "span") ? "inline" : "block");
        }
    };

    function isClassViolatingBylaw(class_year, class_size, n_out_house) {
        if (class_year-4 < 2012) {
            return false;
        } else if (class_size >= 12 && class_size-n_out_house < 12) {
            return true;
        } else if (class_size < 12 && n_out_house > 0) {
            return true;
        }
        return false;
    }

    var tangle2 = new Tangle(document.getElementById("example"), {
        initialize: function () {
            this.hsin_hsins_eaten = 50;

            this.budget_housetotal =  {"FALL2014": 81150.00, "SPRING2015": 81650.00};
            this.budget_brothertotal = {"FALL2014": 23259.53,"SPRING2015": 25833.75};
            this.prev_housebill = {"FALL2014": 3925.00,"SPRING2015":3975.00};

            this.mm_outhouse = 1;
            this.cw_outhouse = 3;
            this.jb_outhouse = 0;

            this.b_classSizeIncrease = 2;
            this.noPayHouseBill = 1;

            this.a_nbro_outhouse = 5;
            this.a_newbros = 12;

            this.nbros = {"FALL2014":29,"SPRING2015":38,"FALL2015":29};
            this.nbros_in = {"FALL2014":26,"SPRING2015":25};

            this.b_semester = 0;

            this.img_hsin_hsin = 0;

            this.class_names = {2015:"Circle Jackers", 2016:"Minute Men", 2017:"Chilly Willies", 2018:"Jailbaters"};

            this.initModel();
        },
        initModel: function() {
            this.m_class_info ={2015:{"name":"Circle Jackers", "size":11, "oncampus":1},
                                2016:{"name":"Minute Men",     "size":6,  "oncampus":1},
                                2017:{"name":"Chilly Willies", "size":13, "oncampus":3},
                                2018:{"name":"Jailbaters",     "size":10, "oncampus":0},
                                2019:{"name":"",               "size":12, "oncampus":0},
                                2020:{"name":"",               "size":12, "oncampus":0},
                                2021:{"name":"",               "size":12, "oncampus":0},
                                2022:{"name":"",               "size":12, "oncampus":0},
                                2023:{"name":"",               "size":12, "oncampus":0},}
            this.m_semester_num = 0;
            this.m_semester_num_prev = 0;
            this.m_semester = (this.m_semester_num % 2 == 0) ? "SPRING" : "FALL";
            this.m_year = 2015+Math.floor(this.m_semester_num/2);
            this.m_school_year = (this.m_semester == "SPRING") ? this.m_year : this.m_year+1;
            this.m_senior_name = this.class_names[2015];
            this.m_junior_name = this.class_names[2016];
            this.m_sophomore_name = this.class_names[2017];
            this.m_freshman_name = this.class_names[2018];
            this.m_senior_size = 11;
            this.m_senior_out_house = 1;
            this.m_junior_size = 6;
            this.m_junior_out_house = 1;
            this.m_sophomore_size = 13;
            this.m_sophomore_out_house = 3;
            this.m_freshman_size = 10;
            this.m_reset = 0;
            this.m_reset_prev = 0;
            this.m_any_fines = true;
        },
        update: function () {

            if (this.m_reset != this.m_reset_prev) {
                this.initModel();
                this.m_reset_prev = this.m_reset;
            }

            /* Introduction */
            if (this.hsin_hsins_eaten <= 25) {
                this.img_hsin_hsin = 0;
            } else if (this.hsin_hsins_eaten <= 50) {
                this.img_hsin_hsin = 1;
            } else if (this.hsin_hsins_eaten <= 75) {
                this.img_hsin_hsin = 2;
            } else {
                this.img_hsin_hsin = 3;
            }
            
            if (this.hsin_hsins_eaten <= 20) {
                this.what_hsin_hsin_did_to_me = "craved more";
            } else {
                this.what_hsin_hsin_did_to_me = "gained "+this.hsin_hsins_eaten*0.5+"lbs";
                if (this.hsin_hsins_eaten > 60) {
                    this.what_hsin_hsin_did_to_me += " and became fluent in Chinese";
                }
            }

            /* Examining Fall 2015 */
            this.bylaw_satisfied = (this.mm_outhouse+this.jb_outhouse == 0 && this.cw_outhouse <= 1) ? 1 : 0;
            var SEMESTER = "FALL2014";

            this.base_outbill = this.budget_brothertotal[SEMESTER]/this.nbros[SEMESTER];
            this.base_housebill = this.budget_housetotal[SEMESTER]/Math.max(28,this.nbros[SEMESTER]-this.mm_outhouse-this.cw_outhouse-this.jb_outhouse)+this.base_outbill;
            this.base_housebill_improvement = this.prev_housebill[SEMESTER]-this.base_housebill;

            this.mm_inhouse = 6-this.mm_outhouse;
            this.mm_totalfine = (6-this.mm_inhouse)*this.base_housebill-this.mm_outhouse*this.base_outbill;
            this.mm_perbrofine = this.mm_totalfine / 6.;

            this.cw_inhouse = 13-this.cw_outhouse;
            this.cw_totalfine = (12-this.cw_inhouse)*this.base_housebill-this.cw_outhouse*this.base_outbill;
            if (this.cw_totalfine < 0) { this.cw_totalfine = 0; }
            this.cw_perbrofine = this.cw_totalfine / 13.;

            this.jb_inhouse = 10-this.jb_outhouse;
            this.jb_totalfine = (10-this.jb_inhouse)*this.base_housebill-this.jb_outhouse*this.base_outbill;
            this.jb_perbrofine = this.jb_totalfine / 10.;

            this.total_fees = this.mm_totalfine + this.cw_totalfine + this.jb_totalfine;


            /* A different style of budget meeting */
            this.a_allin_housebill = this.budget_housetotal["SPRING2015"]/this.nbros["FALL2015"]+this.budget_brothertotal["SPRING2015"]/(this.nbros["FALL2015"]+this.a_newbros);
            this.a_actual_housebill = this.budget_housetotal["SPRING2015"]/(this.nbros["FALL2015"]-this.a_nbro_outhouse)+this.budget_brothertotal["SPRING2015"]/(this.nbros["FALL2015"]+this.a_newbros);
            this.a_inhouse_extrafee = this.a_actual_housebill - this.a_allin_housebill;

            /* Increasing brother size */
            SEMESTER = (this.b_semester == 0) ? "FALL2014" : "SPRING2015";
            this.b_housebill = this.prev_housebill[SEMESTER];
            this.b_newhousebill = this.budget_housetotal[SEMESTER]/(this.nbros_in[SEMESTER]+this.b_classSizeIncrease*3)+this.budget_brothertotal[SEMESTER]/(this.nbros[SEMESTER]+this.b_classSizeIncrease*(3+this.b_semester));

            /* Model */
            this.m_senior_out_house = Math.min(this.m_senior_size, this.m_senior_out_house);
            this.m_junior_out_house = Math.min(this.m_junior_size, this.m_junior_out_house);
            this.m_sophomore_out_house = Math.min(this.m_sophomore_size, this.m_sophomore_out_house);
            this.m_freshman_out_house = Math.min(this.m_freshman_size, this.m_freshman_out_house);

            this.m_semester = (this.m_semester_num % 2 == 0) ? "SPRING" : "FALL";
            this.m_year = 2015+Math.floor(this.m_semester_num/2);
            this.m_school_year = (this.m_semester == "SPRING") ? this.m_year : this.m_year+1;
            var m_budget_semester_name = (this.m_semester == "SPRING") ? "SPRING2015" : "FALL2014";
            this.m_budget = this.budget_housetotal[m_budget_semester_name]+this.budget_brothertotal[m_budget_semester_name];

            if (this.m_semester_num != this.m_semester_num_prev) {
                this.m_senior_size = this.m_class_info[this.m_school_year]["size"];
                this.m_junior_size = this.m_class_info[this.m_school_year+1]["size"];
                this.m_sophomore_size = this.m_class_info[this.m_school_year+2]["size"];
                this.m_freshman_size = this.m_class_info[this.m_school_year+3]["size"];

                this.m_senior_out_house = this.m_class_info[this.m_school_year]["oncampus"];
                this.m_junior_out_house = this.m_class_info[this.m_school_year+1]["oncampus"];
                this.m_sophomore_out_house = this.m_class_info[this.m_school_year+2]["oncampus"];
                this.m_freshman_out_house = this.m_class_info[this.m_school_year+3]["oncampus"];

                this.m_semester_num_prev = this.m_semester_num;
            }

            var senior_info = this.m_class_info[this.m_school_year];
            var junior_info = this.m_class_info[this.m_school_year+1];
            var sophomore_info = this.m_class_info[this.m_school_year+2];
            var freshman_info = this.m_class_info[this.m_school_year+3];

            senior_info["size"] = this.m_senior_size;
            senior_info["oncampus"] = this.m_senior_out_house;
            junior_info["size"] = this.m_junior_size;
            junior_info["oncampus"] = this.m_junior_out_house;
            sophomore_info["size"] = this.m_sophomore_size;
            sophomore_info["oncampus"] = this.m_sophomore_out_house;
            freshman_info["size"] = this.m_freshman_size;

            this.m_senior_name =    (senior_info["name"] != "")     ? senior_info["name"]   : "Senior class";
            this.m_junior_name =    (junior_info["name"] != "")     ? junior_info["name"]   : "Junior class";
            this.m_sophomore_name = (sophomore_info["name"] != "")  ? sophomore_info["name"]: "Sophomore class";
            this.m_freshman_name =  (freshman_info["name"] != "")   ? freshman_info["name"] : "Freshman class";

            this.m_senior_violating_bylaw =    isClassViolatingBylaw(this.m_school_year  , senior_info["size"]   , senior_info["oncampus"]);
            this.m_junior_violating_bylaw =    isClassViolatingBylaw(this.m_school_year+1, junior_info["size"]   , junior_info["oncampus"]);
            this.m_sophomore_violating_bylaw = isClassViolatingBylaw(this.m_school_year+2, sophomore_info["size"], sophomore_info["oncampus"]);

            this.m_any_fines = this.m_senior_violating_bylaw || this.m_junior_violating_bylaw || this.m_sophomore_violating_bylaw;

            var m_nbros_inhouse = (senior_info["size"]-senior_info["oncampus"])+(junior_info["size"]-junior_info["oncampus"])+(sophomore_info["size"]-sophomore_info["oncampus"]);
            
            var m_nbros = senior_info["size"]+junior_info["size"]+sophomore_info["size"];
            if (this.m_semester == "SPRING") {
                m_nbros += freshman_info["size"];
            }

            this.m_outbill = this.budget_brothertotal[m_budget_semester_name]/m_nbros;
            this.m_housebill = this.budget_housetotal[m_budget_semester_name]/m_nbros_inhouse+this.m_outbill;

            var m_nbros_shouldbe_inhouse = 0; 
            m_nbros_shouldbe_inhouse += Math.max(senior_info["size"]-senior_info["oncampus"], Math.min(senior_info["size"],12));
            m_nbros_shouldbe_inhouse += Math.max(junior_info["size"]-junior_info["oncampus"], Math.min(junior_info["size"],12));
            m_nbros_shouldbe_inhouse += Math.max(sophomore_info["size"]-sophomore_info["oncampus"], Math.min(sophomore_info["size"],12));

            this.m_outbill2 = this.budget_brothertotal[m_budget_semester_name]/m_nbros;
            this.m_housebill2 = this.budget_housetotal[m_budget_semester_name]/m_nbros_shouldbe_inhouse+this.m_outbill2;
        }
    });


}
