const revisionModel = require("../model/Revision");
const validator = require("../services/validator");
const fs = require("fs");
const async = require("async");

module.exports = {
  // fetch a count of all records
  countAll: async (request, response, next) => {
    await revisionModel.countDocuments({}, function(err, result) {
      //log error to json response if one occurs
      if (err) {
        response.json({ status: "error", message: "Could not retrieve results", data: null });

        next();
        //log results to json response if successful
      } else {
        response.json({ status: "success", message: "Fetched count", data: result });

        next();
      }
    });
  },

  //fetch a count of records which match the given title
  countTitle: async (request, response, next) => {
    reqTitle = request.query.title;

    await revisionModel.countDocuments({ title: reqTitle }, function(err, result) {
      //log error to json response if one occurs
      if (err) {
        response.json({ status: "error", message: "Could not retrieve results", data: null });

        next();
        //log results to json response if successful
      } else {
        response.json({ status: "success", message: "Fetched count", data: result });

        next();
      }
    });
  },

  //get list of unique titles in the revisions collection
  getUniqueTitles: async (request, response, next) => {
    await revisionModel.distinct("title", function(err, result) {
      //log error to json response if one occurs
      if (err) {
        response.json({ status: "error", message: "Could not retrieve titles", data: null });

        next();
        //log results to json response if successful
      } else {
        response.json({ status: "success", message: "Fetched list of titles", data: result });

        next();
      }
    });
  },

  //for a given title, find the latest revision done to that article
  getLatestRevision: async (request, response, next) => {
    reqTitle = request.query.title;

    await revisionModel
      .find({ title: reqTitle })
      .sort({ timestamp: -1 })
      .limit(1)
      .exec(function(err, result) {
        if (err) {
          response.json({ status: "error", message: "Could not retrieve revision", data: null });

          next();
          //log results to json response if successful
        } else {
          response.json({ status: "success", message: "Fetched latest revision", data: result });

          next();
        }
      });
  },
  //Get Highest Revisions based on user value
  getHighestRevisionsWithValue: async (request, response, next) => {
    const limit = Number(request.query.limit);

    await revisionModel.aggregate([{ $group: { _id: "$title", count: { $sum: 1 } } }, { $sort: { count: -1 } }, { $limit: limit }], function(err, result) {
      if (err) {
        response.json({ status: "error", message: "Could not retrieve revision", data: null });

        next();
        //log results to json response if successful
      } else {
        response.json({ status: "success", message: "Fetched highest " + limit + " revisions", data: result });

        next();
      }
    });
  },
  // Get Lowest Revisions based on user Value
  getLowestRevisionsWithValue: async (request, response, next) => {
    const limit = Number(request.query.limit);

    await revisionModel.aggregate([{ $group: { _id: "$title", count: { $sum: 1 } } }, { $sort: { count: 1 } }, { $limit: limit }], function(err, result) {
      if (err) {
        response.json({ status: "error", message: "Could not retrieve revision", data: null });

        next();
        //log results to json response if successful
      } else {
        response.json({ status: "success", message: "Fetched lowest " + limit + " revisions", data: result });

        next();
      }
    });
  },

  //for a given title, find the earliest revision done to that article
  getOldestRevision: async (request, response, next) => {
    reqTitle = request.query.title;

    await revisionModel
      .find({ title: reqTitle })
      .sort({ timestamp: 1 })
      .limit(1)
      .exec(function(err, result) {
        if (err) {
          response.json({ status: "error", message: "Could not retrieve revision", data: null });

          next();
          //log results to json response if successful
        } else {
          response.json({ status: "success", message: "Fetched oldest revision", data: result });

          next();
        }
      });
  },

  getMostRegisteredUsers: async (request, response, next) => {
    var mostRegisteredUsersPipeline = [
      { $group: { _id: { title: "$title", userid: "$userid" }, distinctUsers: { $sum: 1 } } },
      { $group: { _id: "$_id.title", distinctUsers: { $sum: 1 } } },
      { $sort: { distinctUsers: -1 } },
      { $limit: 1 }
    ];

    await revisionModel.aggregate(mostRegisteredUsersPipeline, function(err, result) {
      if (err) {
        response.json({ status: "error", message: "Problem with executing aggregate function", data: null });

        next();
      } else {
        response.json({ status: "success", message: "Fetched article edited by most users", data: result });

        next();
      }
    });
  },

  getLeastRegisteredUsers: async (request, response, next) => {
    var leastRegisteredUsersPipeline = [
      { $group: { _id: { title: "$title", userid: "$userid" }, distinctUsers: { $sum: 1 } } },
      { $group: { _id: "$_id.title", distinctUsers: { $sum: 1 } } },
      { $sort: { distinctUsers: 1 } },
      { $limit: 1 }
    ];

    await revisionModel.aggregate(leastRegisteredUsersPipeline, function(err, result) {
      if (err) {
        response.json({ status: "error", message: "Problem with executing aggregate function", data: null });

        next();
      } else {
        response.json({ status: "success", message: "Fetched article edited by fewest users", data: result });

        next();
      }
    });
  },

  getOldestArticle: async (request, response, next) => {
    var oldestArticlePipeline = [
      { $group: { _id: "$title", oldest: { $min: "$timestamp" } } },
      { $project: { title: 1, olddate: { $dateFromString: { dateString: "$oldest" } } } },
      { $project: { title: 1, age: { $subtract: [new Date(), "$olddate"] } } },
      { $sort: { age: -1 } },
      { $limit: 1 }
    ];

    await revisionModel.aggregate(oldestArticlePipeline, function(err, result) {
      if (err) {
        response.json({ status: "error", message: "Problem with executing aggregate function", data: null });

        next();
      } else {
        var data = result;
        // converting milliseconds to days
        data[0].age = Math.floor(parseInt(data[0].age) / (1000 * 60 * 60 * 24));
        response.json({ status: "success", message: "Fetched oldest article", data: data });

        next();
      }
    });
  },

  getYoungestArticle: async (request, response, next) => {
    var youngestArticlePipeline = [
      { $group: { _id: "$title", oldest: { $min: "$timestamp" } } },
      { $project: { title: 1, olddate: { $dateFromString: { dateString: "$oldest" } } } },
      { $project: { title: 1, age: { $subtract: [new Date(), "$olddate"] } } },
      { $sort: { age: 1 } },
      { $limit: 1 }
    ];

    await revisionModel.aggregate(youngestArticlePipeline, function(err, result) {
      if (err) {
        response.json({ status: "error", message: "Problem with executing aggregate function", data: null });

        next();
      } else {
        var data = result;
        // converting milliseconds to days
        data[0].age = Math.floor(parseInt(data[0].age) / (1000 * 60 * 60 * 24));
        response.json({ status: "success", message: "Fetched youngest article", data: data });

        next();
      }
    });
  },

  getRevisionsByUserType: async (request, response, next) => {
    function readAsync(file, callback) {
      fs.readFile(file, "utf8", callback);
    }

    await revisionModel.find({}, function(err, results) {
      if (err) {
        response.json({ status: "error", message: "Problem with getting revisions by user type", data: null });

        next();
      } else {
        var bot_contents = "";
        var admin_contents = "";

        files = ["data/bot.txt", "data/admin_active.txt", "data/admin_inactive.txt", "data/admin_semi_active.txt", "data/admin_former.txt"];

        async.map(files, readAsync, function(err, contents) {
          if (contents) {
            bot_contents = contents[0].toString();
            admin_contents = contents[1].toString() + contents[2].toString() + contents[3].toString() + contents[4].toString();
            userArticleCount = { anon: 0, bot: 0, admin: 0, regular: 0 };

            for (var i = 0; i < results.length; i++) {
              if (results[i].anon) {
                userArticleCount["anon"] += 1;
              } else if (admin_contents.includes(results[i].user)) {
                userArticleCount["admin"] += 1;
              } else if (bot_contents.includes(results[i].user)) {
                userArticleCount["bot"] += 1;
              } else {
                userArticleCount["regular"] += 1;
              }
            }

            response.json({ status: "success", message: "got breakdown of revisions by user type", data: userArticleCount });
            next();
          }
        });
      }
    });
  },

  getRevisionsByUserType2: async (request, response, next) => {
    function readAsync(file, callback) {
      fs.readFile(file, "utf8", callback);
    }

    const files = ["data/bot.txt", "data/admin_active.txt", "data/admin_inactive.txt", "data/admin_semi_active.txt", "data/admin_former.txt"];

    async.map(files, readAsync, async (error, contents) => {
      var userBots = contents[0].toString().split("\r\n");
      var userAdminActive = contents[1].toString().split("\r\n");
      var userAdminInactive = contents[2].toString().split("\r\n");
      var userAdminSemi = contents[3].toString().split("\r\n");
      var userAdminFormer = contents[4].toString().split("\r\n");
      var allAdmins = userAdminActive.concat(userAdminInactive.concat(userAdminSemi.concat(userAdminFormer)));

      async.parallel({
      bot: function(cb) {
        revisionModel.aggregate([
        {
          $project: {
            title: "$title",
            user: "$user",
            anon: "$anon",
            year: { $year: { $dateFromString: { dateString: "$timestamp" } } }
          }
        },
        {
          $match: {
            user: { $in: userBots }
          }
        },
        {
          $group: {
            _id: "$year",
            bot_revisions: { $sum: 1 }
          }
        }
      ], function(err, results) { 
        if (err) {
          cb(err); 
        } else { 
          cb(null, results);
        }
      });
    }, 
    
    admin: function(cb) {
      revisionModel.aggregate([
        {
          $project: {
            title: "$title",
            user: "$user",
            anon: "$anon",
            year: { $year: { $dateFromString: { dateString: "$timestamp" } } }
          }
        },
        {
          $match: {
            user: { $in: allAdmins }
          }
        },
        {
          $group: {
            _id: "$year",
            admin_revisions: { $sum: 1 }
          }
        }
      ], function(err, results) { 
        if (err) {
          cb(err); 
        } else { 
          cb(null, results);
        }
      });
    }, 

    anon: function(cb) {
      revisionModel.aggregate([
        {
          $project: {
            title: "$title",
            user: "$user",
            anon: "$anon",
            year: { $year: { $dateFromString: { dateString: "$timestamp" } } }
          }
        },
        {
          $match: {
            anon: { $exists: true }
          }
        },
        {
          $group: {
            _id: "$year",
            anon_revisions: { $sum: 1 }
          }
        }
      ], function(err, results) { 
        if (err) {
          cb(err); 
        } else { 
          cb(null, results);
        }
      });
    },

    regular: function(cb) {
      revisionModel.aggregate([
        {
          $project: {
            title: "$title",
            user: "$user",
            anon: "$anon",
            year: { $year: { $dateFromString: { dateString: "$timestamp" } } }
          }
        },
        {
          $match: {
            $and: [
              {user: {$nin: allAdmins}}, 
              {user: {$nin: userBots}},
              {anon: {$exists: false}}
            ] 
          }
        },
        {
          $group: {
            _id: "$year",
            reg_revisions: { $sum: 1 }
          }
        }
      ], function(err, results) { 
        if (err) {
          cb(err); 
        } else { 
          cb(null, results);
        }
      });
    }

    }, 

    function(err, results) { 
      if (err) { 
        response.json({ status: "error", message: "didn't get stuff", data: err });
        next(); 
      } else { 
        json1 = results.admin;
        json2 = results.bot; 
        json3 = results.anon; 
        json4 = results.regular; 

        mapped_res = json1.map(x => Object.assign(x, json2.find(y => y._id == x._id)));
        mapped_res = mapped_res.map(x => Object.assign(x, json3.find(y => y._id == x._id)));
        mapped_res = mapped_res.map(x => Object.assign(x, json4.find(y => y._id == x._id)));

        response.json({ status: "success", message: "got stuff", data: mapped_res });
        next(); 
      }
    });
  })
  },

  displaySummaryInformation: async (request, response, next) => {
    reqTitle = request.query.title;
    reqFrom = request.query.fromyear ? request.query.fromyear : "1970";
    reqTo = request.query.toyear ? request.query.toyear : new Date().getFullYear().toString();

    stringFrom = reqFrom.toString().concat("-01-01T00:00:00Z");
    stringTo = reqTo.toString().concat("-12-31T23:59:59Z");

    var summaryPipeline = [
      {
        $match: {
          title: reqTitle,
          $expr: {
            $and: [
              {
                $gte: ["$timestamp", stringFrom]
              },
              {
                $lte: ["$timestamp", stringTo]
              }
            ]
          }
        }
      },
      {
        $facet: {
          Total: [{ $count: "Total" }],
          TopFive: [{ $group: { _id: "$user", usercount: { $sum: 1 } } }, { $sort: { usercount: -1 } }, { $limit: 5 }]
        }
      }
    ];

    await revisionModel.aggregate(summaryPipeline, function(err, result) {
      if (err) {
        response.json({ status: "error", message: "Problem with fetching individual article summary", data: null });

        next();
      } else {
        response.json({ status: "success", message: "Fetched individual summary article for " + reqTitle, data: result });

        next();
      }
    });
  },

  getArticleRevisionsByUserType: async (request, response, next) => {
    function readAsync(file, callback) {
      fs.readFile(file, "utf8", callback);
    }

    reqTitle = request.query.title;

    await revisionModel.find({ title: reqTitle }, function(err, results) {
      if (err) {
        response.json({ status: "error", message: "Problem with getting revisions for " + reqTitle + " by user type", data: null });

        next();
      } else {
        var bot_contents = "";
        var admin_contents = "";

        files = ["data/bot.txt", "data/admin_active.txt", "data/admin_inactive.txt", "data/admin_semi_active.txt", "data/admin_former.txt"];

        async.map(files, readAsync, function(err, contents) {
          if (contents) {
            bot_contents = contents[0].toString();
            admin_contents = contents[1].toString() + contents[2].toString() + contents[3].toString() + contents[4].toString();
            userArticleCount = { anon: 0, bot: 0, admin: 0, regular: 0 };

            for (var i = 0; i < results.length; i++) {
              if (results[i].anon) {
                userArticleCount["anon"] += 1;
              } else if (admin_contents.includes(results[i].user)) {
                userArticleCount["admin"] += 1;
              } else if (bot_contents.includes(results[i].user)) {
                userArticleCount["bot"] += 1;
              } else {
                userArticleCount["regular"] += 1;
              }
            }

            response.json({ status: "success", message: "got breakdown of revisions for " + reqTitle + " by user type", data: userArticleCount });
            next();
          }
        });
      }
    });
  },

  getRevsByUserTypeAndYear: async (request, response, next) => {
    function readAsync(file, callback) {
      fs.readFile(file, "utf8", callback);
    }

    function insertIntoDict(dict, year, usertype) {
      if (dict[year]) {
        if (dict[year][usertype]) {
          dict[year][usertype] += 1;
        } else {
          dict[year][usertype] = 1;
        }
      } else {
        dict[year] = {};
        dict[year][usertype] = 1;
      }
    }

    await revisionModel.find({}, function(err, results) {
      if (err) {
        response.json({ status: "error", message: "Problem with getting revisions by user type and year", data: null });

        next();
      } else {
        var bot_contents = "";
        var admin_contents = "";

        files = ["data/bot.txt", "data/admin_active.txt", "data/admin_inactive.txt", "data/admin_semi_active.txt", "data/admin_former.txt"];

        async.map(files, readAsync, function(err, contents) {
          if (contents) {
            bot_contents = contents[0].toString();
            admin_contents = contents[1].toString() + contents[2].toString() + contents[3].toString() + contents[4].toString();
            userArticleCount = {};

            for (var i = 0; i < results.length; i++) {
              year = new Date(results[i].timestamp).getFullYear();

              if (results[i].anon) {
                insertIntoDict(userArticleCount, year, "anon");
              } else if (admin_contents.includes(results[i].user)) {
                insertIntoDict(userArticleCount, year, "admin");
              } else if (bot_contents.includes(results[i].user)) {
                insertIntoDict(userArticleCount, year, "bot");
              } else {
                insertIntoDict(userArticleCount, year, "regular");
              }
            }

            var output = Object.keys(userArticleCount).map(function(key) {
              return { type: key, name: userArticleCount[key] };
            });

            response.json({ status: "success", message: "got breakdown of revisions by user type and year", data: output });
            next();
          }
        });
      }
    });
  },

  getArticleRevsByUserTypeAndYear: async (request, response, next) => {
    function readAsync(file, callback) {
      fs.readFile(file, "utf8", callback);
    }

    function insertIntoDict(dict, year, usertype) {
      if (dict[year]) {
        if (dict[year][usertype]) {
          dict[year][usertype] += 1;
        } else {
          dict[year][usertype] = 1;
        }
      } else {
        dict[year] = {};
        dict[year][usertype] = 1;
      }
    }

    reqTitle = request.query.title;

    await revisionModel.find({ title: reqTitle }, function(err, results) {
      if (err) {
        response.json({ status: "error", message: "Problem with getting revisions for " + reqTitle + " by user type and year", data: null });

        next();
      } else {
        var bot_contents = "";
        var admin_contents = "";

        files = ["data/bot.txt", "data/admin_active.txt", "data/admin_inactive.txt", "data/admin_semi_active.txt", "data/admin_former.txt"];

        async.map(files, readAsync, function(err, contents) {
          if (contents) {
            bot_contents = contents[0].toString();
            admin_contents = contents[1].toString() + contents[2].toString() + contents[3].toString() + contents[4].toString();
            userArticleCount = {};

            for (var i = 0; i < results.length; i++) {
              year = new Date(results[i].timestamp).getFullYear();

              if (results[i].anon) {
                insertIntoDict(userArticleCount, year, "anon");
              } else if (admin_contents.includes(results[i].user)) {
                insertIntoDict(userArticleCount, year, "admin");
              } else if (bot_contents.includes(results[i].user)) {
                insertIntoDict(userArticleCount, year, "bot");
              } else {
                insertIntoDict(userArticleCount, year, "regular");
              }
            }

            var output = Object.keys(userArticleCount).map(function(key) {
              return { type: key, name: userArticleCount[key] };
            });

            // display the result

            response.json({ status: "success", message: "got breakdown of revisions for " + reqTitle + " by user type and year", data: output });
            next();
          }
        });
      }
    });
  }
};
