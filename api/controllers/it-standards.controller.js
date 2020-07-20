const ctrl = require('./base.controller');

const fs = require('fs');
const path = require('path');

const queryPath = '../queries/';

function findAll(req, res) {
  var query = fs.readFileSync(path.join(__dirname, queryPath, 'GET/get_it-standards.sql')).toString() +
    ` WHERE obj_standard_type.Keyname LIKE 'Software'
      AND obj_technology_status.Keyname NOT LIKE 'Not yet submitted'
      GROUP BY tech.Id;`;

  res = ctrl.sendQuery(query, 'IT Standards', res);
};

function findOne(req, res) {
  var query = fs.readFileSync(path.join(__dirname, queryPath, 'GET/get_it-standards.sql')).toString() +
    ` WHERE tech.Id = ${req.params.id};`;

  res = ctrl.sendQuery(query, 'individual IT Standard', res);
};

function findApplications(req, res) {
  var query = fs.readFileSync(path.join(__dirname, queryPath, 'GET/get_applications.sql')).toString() +
    ` AND tech.Id = ${req.params.id} GROUP BY app.Id;`;

  res = ctrl.sendQuery(query, 'applications using IT Standard', res);
};

function update(req, res) {
  if (req.headers.authorization) {
    var data = req.body;

    // Create string to update IT Standards Categories
    var catString = '';
    if (data.itStandCategory) {
      // Delete any references first
      catString += `DELETE FROM zk_technology_standard_category WHERE obj_technology_Id=${req.params.id}; `;

      // Insert new IDs
      data.itStandCategory.forEach(catID => {
        catString += `INSERT INTO zk_technology_standard_category (obj_standard_category_Id, obj_technology_Id) VALUES (${catID}, ${req.params.id}); `;
      });
    }

    // Create string to update IT Standards POCs
    var pocString = '';
    if (data.itStandPOC) {
      // Delete any references first
      pocString += `DELETE FROM zk_technology_poc WHERE obj_technology_Id=${req.params.id}; `;

      // Insert new IDs
      data.itStandPOC.forEach(pocID => {
        pocString += `INSERT INTO zk_technology_poc (obj_technology_Id, obj_poc_Id) VALUES (${req.params.id}, ${pocID}); `;
      });
    }

    var query = `SET FOREIGN_KEY_CHECKS=0;
      UPDATE obj_technology
      SET Keyname                       = '${data.itStandName}',
        obj_technology_status_Id        = ${data.itStandStatus},
        Description                     = '${data.itStandDesc}',
        obj_standard_type_Id            = ${data.itStandType},
        obj_508_compliance_status_Id    = ${data.itStand508},
        Available_through_Myview        = '${data.itStandMyView}',
        Vendor_Standard_Organization    = '${data.itStandVendorOrg}',
        obj_deployment_type_Id          = ${data.itStandDeployment},
        Gold_Image                      = '${data.itStandGoldImg}',
        Gold_Image_Comment              = '${data.itStandGoldComment}',
        Approved_Status_Expiration_Date = '${data.itStandAprvExp}',
        Comments                        = '${data.itStandComments}',
        Reference_documents             = '${data.itStandRefDocs}'
      WHERE Id = ${req.params.id};
      SET FOREIGN_KEY_CHECKS=1;
      ${catString}
      ${pocString}`

    console.log(query);

    res = ctrl.sendQuery(query, 'update IT Standard', res);
  } else {
    res.status(502).json({
      message: "No authorization token present. Not allowed to update IT-Standards"
    });
  }
}

function find508Compliance(req, res) {
  var query = fs.readFileSync(path.join(__dirname, queryPath, 'GET/get_it-standard_508_status.sql')).toString();

  res = ctrl.sendQuery(query, '508 Compliance Statuses', res);
};

function findCategories(req, res) {
  var query = fs.readFileSync(path.join(__dirname, queryPath, 'GET/get_it-standard_categories.sql')).toString();

  res = ctrl.sendQuery(query, 'IT Standard Categories', res);
};

function findDeployTypes(req, res) {
  var query = fs.readFileSync(path.join(__dirname, queryPath, 'GET/get_it-standard_deploy_types.sql')).toString();

  res = ctrl.sendQuery(query, 'IT Standard Deployment Types', res);
};

function findStatuses(req, res) {
  var query = fs.readFileSync(path.join(__dirname, queryPath, 'GET/get_it-standard_statuses.sql')).toString();

  res = ctrl.sendQuery(query, 'IT Standard Statuses', res);
};

function findTypes(req, res) {
  var query = fs.readFileSync(path.join(__dirname, queryPath, 'GET/get_it-standard_types.sql')).toString();

  res = ctrl.sendQuery(query, 'IT Standard Types', res);
};

module.exports = {
  findAll,
  findOne,
  findApplications,

  update,

  find508Compliance,
  findCategories,
  findDeployTypes,
  findStatuses,
  findTypes
};