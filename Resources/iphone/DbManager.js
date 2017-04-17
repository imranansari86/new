var db;

if (Ti.App.Properties.getString("dbversion") != Ti.App.Properties.getString("app-db-version")) {
    var dbOLD = Titanium.Database.install("/VolunteerData1.sqlite", "VolunteerData");
    dbOLD.close();
    dbOLD.remove();
    db = Titanium.Database.install("/VolunteerData1.sqlite", "VolunteerData");
    Alloy.Globals.db = db;
    Ti.App.Properties.setString("dbversion", Ti.App.Properties.getString("app-db-version"));
    Ti.App.Properties.setString("lastDateTimeGetVolunteerData", null);
} else {
    db = Titanium.Database.install("/VolunteerData1.sqlite", "VolunteerData");
    Alloy.Globals.db = db;
}

exports.Save_GuideAllList = function(guideData) {
    Ti.API.info("Save guide Data in Database  : " + JSON.stringify(guideData));
    try {
        db = Ti.Database.open("VolunteerData");
        for (var i = 0; i < guideData.length; i++) {
            var guide = guideData[i];
            if ("a" == guide.record_status || "u" == guide.record_status) {
                Ti.API.info("Check Update");
                var guideResultSet = db.execute("SELECT * FROM Guide WHERE guide_id=" + guide.guide_id);
                null != guideResultSet && guideResultSet.rowCount > 0 ? db.execute("UPDATE Guide SET guide_type=?,location=?,heading=?,description=?,created_at=?,updated_at=?,status=?,delete_date=?,record_order=? WHERE guide_id=" + guide.guide_id, guide.guide_type, guide.location, guide.heading, guide.description, guide.created_at, guide.updated_at, guide.status, guide.delete_date, guide.record_order) : db.execute("INSERT INTO Guide(guide_id,guide_type,location,heading,description,created_at,updated_at,status,delete_date,record_order) VALUES (?,?,?,?,?,?,?,?,?,?)", guide.guide_id, guide.guide_type, guide.location, guide.heading, guide.description, guide.created_at, guide.updated_at, guide.status, guide.delete_date, guide.record_order);
            } else if ("d" == guide.record_status) {
                Ti.API.info("Check Delete");
                db.execute("DELETE from Guide where guide_id=?", guide.guide_id);
            }
        }
    } catch (dberror) {} finally {
        db && db.close();
    }
};

exports.deleteGarbageGuides = function(guideData) {
    Ti.API.info("Delete garbage guide Data in Database  : " + JSON.stringify(guideData));
    try {
        db = Ti.Database.open("VolunteerData");
        for (var i = 0; i < guideData.length; i++) {
            var guide = guideData[i];
            db.execute("DELETE from Guide where guide_id=?", guide.guide_id);
        }
    } catch (dberror) {} finally {
        db && db.close();
    }
};

exports.Get_guideAllList = function() {
    var guideArray = new Array();
    var resultSet;
    try {
        db = Titanium.Database.open("VolunteerData");
        resultSet = db.execute("SELECT * FROM Guide order by record_order desc");
        while (resultSet.isValidRow()) {
            var dataobj = {};
            dataobj.guide_id = resultSet.fieldByName("guide_id");
            dataobj.guide_type = resultSet.fieldByName("guide_type");
            dataobj.location = resultSet.fieldByName("location");
            dataobj.heading = resultSet.fieldByName("heading");
            dataobj.description = resultSet.fieldByName("description");
            dataobj.created_at = resultSet.fieldByName("created_at");
            dataobj.updated_at = resultSet.fieldByName("updated_at");
            dataobj.status = resultSet.fieldByName("status");
            dataobj.delete_date = resultSet.fieldByName("delete_date");
            dataobj.record_order = resultSet.fieldByName("record_order");
            guideArray.push(dataobj);
            resultSet.next();
        }
    } catch (err) {} finally {
        db && db.close();
    }
    return guideArray;
};

exports.Get_guideByIDForNotification = function(guidID) {
    var guideArray = new Array();
    var resultSet;
    try {
        db = Titanium.Database.open("VolunteerData");
        resultSet = db.execute("SELECT * FROM Guide Where guide_id=" + guidID);
        while (resultSet.isValidRow()) {
            var dataobj = {};
            dataobj.guide_id = resultSet.fieldByName("guide_id");
            dataobj.guide_type = resultSet.fieldByName("guide_type");
            dataobj.location = resultSet.fieldByName("location");
            dataobj.heading = resultSet.fieldByName("heading");
            dataobj.description = resultSet.fieldByName("description");
            dataobj.created_at = resultSet.fieldByName("created_at");
            dataobj.updated_at = resultSet.fieldByName("updated_at");
            dataobj.status = resultSet.fieldByName("status");
            dataobj.delete_date = resultSet.fieldByName("delete_date");
            dataobj.record_order = resultSet.fieldByName("record_order");
            guideArray.push(dataobj);
            resultSet.next();
        }
    } catch (err) {} finally {
        db && db.close();
    }
    return guideArray;
};

exports.Save_TipsAllList = function(tipsData) {
    try {
        db = Ti.Database.open("VolunteerData");
        for (var i = 0; i < tipsData.length; i++) {
            var tips = tipsData[i];
            if ("a" == tips.record_status || "u" == tips.record_status) {
                var tipsResultSet = db.execute("SELECT * FROM Tips WHERE tip_id=" + tips.tip_id);
                null != tipsResultSet && tipsResultSet.rowCount > 0 ? db.execute("UPDATE Tips SET tip_type=?,tip_location=?,category_id=?,list_title=?,title_description=?,is_featured=?,tip_banner=?,created_at=?,updated_at=?,status=?,delete_date=?,record_order=? WHERE tip_id=" + tips.tip_id, tips.tip_type, tips.tip_location, tips.category_id, tips.list_title, tips.title_description, tips.is_featured, tips.tip_banner, tips.created_at, tips.updated_at, tips.status, tips.delete_date, tips.record_order) : db.execute("INSERT INTO Tips(tip_id,tip_type,tip_location,category_id,list_title,title_description,is_featured,tip_banner,created_at,updated_at,status,delete_date,record_order) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)", tips.tip_id, tips.tip_type, tips.tip_location, tips.category_id, tips.list_title, tips.title_description, tips.is_featured, tips.tip_banner, tips.created_at, tips.updated_at, tips.status, tips.delete_date, tips.record_order);
                var cats = tips.category_id.split(",");
                if (cats && cats.length > 0) for (var j = 0; j < cats.length; j++) {
                    var checkTipsCats = db.execute("SELECT * FROM Tip_Category WHERE tip_id=" + tips.tip_id + " AND cat_id=" + cats[j]);
                    if (null != checkTipsCats && checkTipsCats.rowCount > 0) continue;
                    {
                        db.execute("INSERT INTO Tip_Category(tip_id,cat_id) VALUES (?,?)", tips.tip_id, cats[j]);
                    }
                }
            } else "d" == tips.record_status && db.execute("DELETE from Tips where tip_id=?", tips.tip_id);
        }
    } catch (dberror) {
        Ti.API.info(JSON.stringify(dberror));
    } finally {
        db && db.close();
    }
};

exports.Get_FeaturedtipsAllList = function() {
    var tipsArray = new Array();
    var resultSet;
    try {
        db = Titanium.Database.open("VolunteerData");
        resultSet = db.execute("SELECT * FROM Tips where is_featured=1 order by record_order desc");
        Ti.API.info("resultset tips:" + JSON.stringify(resultSet));
        while (resultSet.isValidRow()) {
            var dataobj = {};
            dataobj.tip_id = resultSet.fieldByName("tip_id");
            dataobj.tip_type = resultSet.fieldByName("tip_type");
            dataobj.tip_location = resultSet.fieldByName("tip_location");
            dataobj.category_id = resultSet.fieldByName("category_id");
            dataobj.list_title = resultSet.fieldByName("list_title");
            dataobj.title_description = resultSet.fieldByName("title_description");
            dataobj.is_featured = resultSet.fieldByName("is_featured");
            dataobj.tip_banner = resultSet.fieldByName("tip_banner");
            dataobj.updated_at = resultSet.fieldByName("created_at");
            dataobj.updated_at = resultSet.fieldByName("updated_at");
            dataobj.status = resultSet.fieldByName("status");
            dataobj.delete_date = resultSet.fieldByName("delete_date");
            dataobj.record_order = resultSet.fieldByName("record_order");
            tipsArray.push(dataobj);
            Ti.API.info("tipsArray : " + JSON.stringify(tipsArray));
            resultSet.next();
        }
    } catch (err) {} finally {
        db && db.close();
    }
    return tipsArray;
};

exports.Get_tipsAllListByCategory = function(category_id) {
    var tipsArray = new Array();
    var resultSet;
    try {
        db = Titanium.Database.open("VolunteerData");
        resultSet = db.execute("SELECT tc.id,tc.cat_id, t.* FROM Tip_Category tc, Tips t WHERE tc.cat_id=" + category_id + " AND t.tip_id=tc.tip_id order by t.record_order desc");
        Ti.API.info("resultset tips:" + JSON.stringify(resultSet));
        while (resultSet.isValidRow()) {
            var dataobj = {};
            dataobj.tip_id = resultSet.fieldByName("tip_id");
            dataobj.tip_type = resultSet.fieldByName("tip_type");
            dataobj.tip_location = resultSet.fieldByName("tip_location");
            dataobj.category_id = resultSet.fieldByName("category_id");
            dataobj.list_title = resultSet.fieldByName("list_title");
            dataobj.title_description = resultSet.fieldByName("title_description");
            dataobj.is_featured = resultSet.fieldByName("is_featured");
            dataobj.tip_banner = resultSet.fieldByName("tip_banner");
            dataobj.updated_at = resultSet.fieldByName("created_at");
            dataobj.updated_at = resultSet.fieldByName("updated_at");
            dataobj.status = resultSet.fieldByName("status");
            dataobj.delete_date = resultSet.fieldByName("delete_date");
            dataobj.record_order = resultSet.fieldByName("record_order");
            tipsArray.push(dataobj);
            Ti.API.info("tipsArray : " + JSON.stringify(tipsArray));
            resultSet.next();
        }
    } catch (err) {} finally {
        db && db.close();
    }
    return tipsArray;
};

exports.Get_tipsAllListByCategoryWithoutFeatured = function(category_id) {
    var tipsArray = new Array();
    var resultSet;
    try {
        db = Titanium.Database.open("VolunteerData");
        resultSet = db.execute("SELECT tc.id,tc.cat_id, t.* FROM Tip_Category tc, Tips t WHERE tc.cat_id=" + category_id + " AND t.tip_id=tc.tip_id AND is_featured=0 order by t.record_order desc");
        Ti.API.info("resultset tips:" + JSON.stringify(resultSet));
        while (resultSet.isValidRow()) {
            var dataobj = {};
            dataobj.tip_id = resultSet.fieldByName("tip_id");
            dataobj.tip_type = resultSet.fieldByName("tip_type");
            dataobj.tip_location = resultSet.fieldByName("tip_location");
            dataobj.category_id = resultSet.fieldByName("category_id");
            dataobj.list_title = resultSet.fieldByName("list_title");
            dataobj.title_description = resultSet.fieldByName("title_description");
            dataobj.is_featured = resultSet.fieldByName("is_featured");
            dataobj.tip_banner = resultSet.fieldByName("tip_banner");
            dataobj.updated_at = resultSet.fieldByName("created_at");
            dataobj.updated_at = resultSet.fieldByName("updated_at");
            dataobj.status = resultSet.fieldByName("status");
            dataobj.delete_date = resultSet.fieldByName("delete_date");
            dataobj.record_order = resultSet.fieldByName("record_order");
            tipsArray.push(dataobj);
            Ti.API.info("tipsArray : " + JSON.stringify(tipsArray));
            resultSet.next();
        }
    } catch (err) {} finally {
        db && db.close();
    }
    return tipsArray;
};

exports.Get_tipByIDForNotification = function(tip_id) {
    var tipsArray = new Array();
    var resultSet;
    try {
        db = Titanium.Database.open("VolunteerData");
        resultSet = db.execute("SELECT * FROM Tips WHERE tip_id=" + tip_id);
        Ti.API.info("resultset tips:" + JSON.stringify(resultSet));
        while (resultSet.isValidRow()) {
            var dataobj = {};
            dataobj.tip_id = resultSet.fieldByName("tip_id");
            dataobj.tip_type = resultSet.fieldByName("tip_type");
            dataobj.tip_location = resultSet.fieldByName("tip_location");
            dataobj.category_id = resultSet.fieldByName("category_id");
            dataobj.list_title = resultSet.fieldByName("list_title");
            dataobj.title_description = resultSet.fieldByName("title_description");
            dataobj.is_featured = resultSet.fieldByName("is_featured");
            dataobj.tip_banner = resultSet.fieldByName("tip_banner");
            dataobj.updated_at = resultSet.fieldByName("created_at");
            dataobj.updated_at = resultSet.fieldByName("updated_at");
            dataobj.status = resultSet.fieldByName("status");
            dataobj.delete_date = resultSet.fieldByName("delete_date");
            dataobj.record_order = resultSet.fieldByName("record_order");
            tipsArray.push(dataobj);
            Ti.API.info("tipsArray : " + JSON.stringify(tipsArray));
            resultSet.next();
        }
    } catch (err) {} finally {
        db && db.close();
    }
    return tipsArray;
};

exports.deleteGarbageTips = function(tipsData) {
    Ti.API.info("Delete garbage tips data in Database  : " + JSON.stringify(tipsData));
    try {
        db = Ti.Database.open("VolunteerData");
        for (var i = 0; i < tipsData.length; i++) {
            var tip = tipsData[i];
            db.execute("DELETE from Tips where tip_id=?", tip.tip_id);
        }
    } catch (dberror) {} finally {
        db && db.close();
    }
};

exports.Save_ContactsAllList = function(contactsData) {
    Ti.API.info("Save contacts Data in Database  : " + JSON.stringify(contactsData));
    try {
        db = Ti.Database.open("VolunteerData");
        for (var i = 0; i < contactsData.length; i++) {
            var contacts = contactsData[i];
            var keycontactsData = contacts.key_contacts;
            Ti.API.info("contacts RecordStatus: " + i + "..." + contacts.record_status);
            if ("a" == contacts.record_status || "u" == contacts.record_status) {
                Ti.API.info("Check Update");
                var contactsResultSet = db.execute("SELECT * FROM Contacts WHERE contact_id=" + contacts.contact_id);
                Ti.API.info("contactsResultSet :" + contactsResultSet + "  . . . . . rowcount" + contactsResultSet.rowCount);
                if (null != contactsResultSet && contactsResultSet.rowCount > 0) {
                    db.execute("UPDATE Contacts SET organisation_contact_type=?,contact_location=?,organisation_name=?,organisation_logo=?,organisation_category=?,organisation_blurb=?,organisation_phone=?,organisation_email=?,organisation_web_address=?,organisation_physical_address=?,organisational_postal_address=?,status=?,created_at=?,updated_at=?,delete_date=?,record_order=? WHERE contact_id=" + contacts.contact_id, contacts.organisation_contact_type, contacts.contact_location, contacts.organisation_name, contacts.organisation_logo, contacts.organisation_category, contacts.organisation_blurb, contacts.organisation_phone, contacts.organisation_email, contacts.organisation_web_address, contacts.organisation_physical_address, contacts.organisational_postal_address, contacts.status, contacts.created_at, contacts.updated_at, contacts.delete_date, contacts.record_order);
                    db.execute("DELETE from keyContacts where contact_master_id=?", contacts.contact_id);
                    if (keycontactsData.length > 0) for (var j = 0; j < keycontactsData.length; j++) {
                        var keycontacts = keycontactsData[j];
                        db.execute("INSERT INTO keyContacts(key_contact_id,contact_master_id,contact_name,contact_email,contact_type_1,contact_value_1,country_code,contact_type_2,contact_value_2,contact_phone,physical_address,status,created_at,updated_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)", keycontacts.key_contact_id, keycontacts.contact_master_id, keycontacts.contact_name, keycontacts.contact_email, keycontacts.contact_type_1, keycontacts.contact_value_1, keycontacts.country_code, keycontacts.contact_type_2, keycontacts.contact_value_2, keycontacts.contact_phone, keycontacts.physical_address, keycontacts.status, keycontacts.created_at, keycontacts.updated_at);
                    }
                } else {
                    db.execute("INSERT INTO Contacts(contact_id,organisation_contact_type,contact_location,organisation_name,organisation_logo,organisation_category,organisation_blurb,organisation_phone,organisation_email,organisation_web_address,organisation_physical_address,organisational_postal_address,status,created_at,updated_at,delete_date,record_order) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", contacts.contact_id, contacts.organisation_contact_type, contacts.contact_location, contacts.organisation_name, contacts.organisation_logo, contacts.organisation_category, contacts.organisation_blurb, contacts.organisation_phone, contacts.organisation_email, contacts.organisation_web_address, contacts.organisation_physical_address, contacts.organisational_postal_address, contacts.status, contacts.created_at, contacts.updated_at, contacts.delete_date, contacts.record_order);
                    db.execute("DELETE from keyContacts where contact_master_id=?", contacts.contact_id);
                    if (keycontactsData.length > 0) for (var j = 0; j < keycontactsData.length; j++) {
                        var keycontacts = keycontactsData[j];
                        db.execute("INSERT INTO keyContacts(key_contact_id,contact_master_id,contact_name,contact_email,contact_type_1,contact_value_1,country_code,contact_type_2,contact_value_2,contact_phone,physical_address,status,created_at,updated_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)", keycontacts.key_contact_id, keycontacts.contact_master_id, keycontacts.contact_name, keycontacts.contact_email, keycontacts.contact_type_1, keycontacts.contact_value_1, keycontacts.country_code, keycontacts.contact_type_2, keycontacts.contact_value_2, keycontacts.contact_phone, keycontacts.physical_address, keycontacts.status, keycontacts.created_at, keycontacts.updated_at);
                    }
                }
            } else if ("d" == contacts.record_status) {
                Ti.API.info("Check Delete");
                db.execute("DELETE from Contacts where contact_id=?", contacts.contact_id);
                db.execute("DELETE from keyContacts where contact_master_id=?", contacts.contact_id);
            }
        }
    } catch (dberror) {} finally {
        db && db.close();
    }
};

exports.Get_contactsAllList = function() {
    var contactsArray = new Array();
    var resultSet;
    try {
        db = Titanium.Database.open("VolunteerData");
        resultSet = db.execute("SELECT * FROM Contacts order by record_order desc");
        Ti.API.info("rowcount Contact Db" + resultSet.rowCount);
        Ti.API.info("Resultset contacts:" + JSON.stringify(resultSet));
        while (resultSet.isValidRow()) {
            var dataobj = {};
            dataobj.contact_id = resultSet.fieldByName("contact_id");
            dataobj.organisation_contact_type = resultSet.fieldByName("organisation_contact_type");
            dataobj.contact_location = resultSet.fieldByName("contact_location");
            dataobj.organisation_name = resultSet.fieldByName("organisation_name");
            dataobj.organisation_logo = resultSet.fieldByName("organisation_logo");
            dataobj.organisation_category = resultSet.fieldByName("organisation_category");
            dataobj.organisation_blurb = resultSet.fieldByName("organisation_blurb");
            dataobj.organisation_phone = resultSet.fieldByName("organisation_phone");
            dataobj.organisation_email = resultSet.fieldByName("organisation_email");
            dataobj.organisation_web_address = resultSet.fieldByName("organisation_web_address");
            dataobj.organisation_physical_address = resultSet.fieldByName("organisation_physical_address");
            dataobj.organisational_postal_address = resultSet.fieldByName("organisational_postal_address");
            dataobj.status = resultSet.fieldByName("status");
            dataobj.created_at = resultSet.fieldByName("created_at");
            dataobj.updated_at = resultSet.fieldByName("updated_at");
            dataobj.delete_date = resultSet.fieldByName("delete_date");
            dataobj.record_order = resultSet.fieldByName("record_order");
            var keyContactsArray = new Array();
            var resultSetkeyContacts = db.execute("SELECT * FROM keyContacts WHERE contact_master_id=" + resultSet.fieldByName("contact_id"));
            Ti.API.info("Resultset key contacts:" + resultSetkeyContacts.rowCount);
            var keycontactLength = resultSetkeyContacts.rowCount;
            try {
                if (keycontactLength > 0) for (var i = 0; keycontactLength > i; i++) if (resultSetkeyContacts.isValidRow()) {
                    var keyContacts = {};
                    keyContacts.key_contact_id = resultSetkeyContacts.fieldByName("key_contact_id");
                    keyContacts.contact_master_id = resultSetkeyContacts.fieldByName("contact_master_id");
                    keyContacts.contact_name = resultSetkeyContacts.fieldByName("contact_name");
                    keyContacts.contact_email = resultSetkeyContacts.fieldByName("contact_email");
                    keyContacts.contact_type_1 = resultSetkeyContacts.fieldByName("contact_type_1");
                    keyContacts.contact_value_1 = resultSetkeyContacts.fieldByName("contact_value_1");
                    keyContacts.country_code = resultSetkeyContacts.fieldByName("country_code");
                    keyContacts.contact_type_2 = resultSetkeyContacts.fieldByName("contact_type_2");
                    keyContacts.contact_value_2 = resultSetkeyContacts.fieldByName("contact_value_2");
                    keyContacts.contact_phone = resultSetkeyContacts.fieldByName("contact_phone");
                    keyContacts.physical_address = resultSetkeyContacts.fieldByName("physical_address");
                    keyContacts.status = resultSetkeyContacts.fieldByName("status");
                    keyContacts.created_at = resultSetkeyContacts.fieldByName("created_at");
                    keyContacts.updated_at = resultSetkeyContacts.fieldByName("updated_at");
                    keyContactsArray.push(keyContacts);
                    resultSetkeyContacts.next();
                    Ti.API.info("keyContactsArray " + JSON.stringify(keyContactsArray));
                }
                dataobj.key_contacts = keyContactsArray;
            } catch (e) {}
            contactsArray.push(dataobj);
            Ti.API.info("keyContactsArraydsfdsfadsfads " + JSON.stringify(contactsArray));
            resultSet.next();
        }
    } catch (err) {} finally {
        db && db.close();
    }
    return contactsArray;
};

exports.Get_contactByIDForNotification = function(contact_id) {
    var contactsArray = new Array();
    var resultSet;
    try {
        db = Titanium.Database.open("VolunteerData");
        resultSet = db.execute("SELECT * FROM Contacts WHERE contact_id=" + contact_id);
        Ti.API.info("rowcount Contact Db" + resultSet.rowCount);
        Ti.API.info("Resultset contacts:" + JSON.stringify(resultSet));
        while (resultSet.isValidRow()) {
            var dataobj = {};
            dataobj.contact_id = resultSet.fieldByName("contact_id");
            dataobj.organisation_contact_type = resultSet.fieldByName("organisation_contact_type");
            dataobj.contact_location = resultSet.fieldByName("contact_location");
            dataobj.organisation_name = resultSet.fieldByName("organisation_name");
            dataobj.organisation_logo = resultSet.fieldByName("organisation_logo");
            dataobj.organisation_category = resultSet.fieldByName("organisation_category");
            dataobj.organisation_blurb = resultSet.fieldByName("organisation_blurb");
            dataobj.organisation_phone = resultSet.fieldByName("organisation_phone");
            dataobj.organisation_email = resultSet.fieldByName("organisation_email");
            dataobj.organisation_web_address = resultSet.fieldByName("organisation_web_address");
            dataobj.organisation_physical_address = resultSet.fieldByName("organisation_physical_address");
            dataobj.organisational_postal_address = resultSet.fieldByName("organisational_postal_address");
            dataobj.status = resultSet.fieldByName("status");
            dataobj.created_at = resultSet.fieldByName("created_at");
            dataobj.updated_at = resultSet.fieldByName("updated_at");
            dataobj.delete_date = resultSet.fieldByName("delete_date");
            dataobj.record_order = resultSet.fieldByName("record_order");
            var keyContactsArray = new Array();
            var resultSetkeyContacts = db.execute("SELECT * FROM keyContacts WHERE contact_master_id=" + resultSet.fieldByName("contact_id"));
            Ti.API.info("Resultset key contacts:" + resultSetkeyContacts.rowCount);
            var keycontactLength = resultSetkeyContacts.rowCount;
            if (keycontactLength > 0) {
                for (var i = 0; keycontactLength > i; i++) if (resultSetkeyContacts.isValidRow()) {
                    var keyContacts = {};
                    keyContacts.key_contact_id = resultSetkeyContacts.fieldByName("key_contact_id");
                    keyContacts.contact_master_id = resultSetkeyContacts.fieldByName("contact_master_id");
                    keyContacts.contact_name = resultSetkeyContacts.fieldByName("contact_name");
                    keyContacts.contact_email = resultSetkeyContacts.fieldByName("contact_email");
                    keyContacts.contact_type_1 = resultSetkeyContacts.fieldByName("contact_type_1");
                    keyContacts.contact_value_1 = resultSetkeyContacts.fieldByName("contact_value_1");
                    keyContacts.country_code = resultSetkeyContacts.fieldByName("country_code");
                    keyContacts.contact_type_2 = resultSetkeyContacts.fieldByName("contact_type_2");
                    keyContacts.contact_value_2 = resultSetkeyContacts.fieldByName("contact_value_2");
                    keyContacts.contact_phone = resultSetkeyContacts.fieldByName("contact_phone");
                    keyContacts.physical_address = resultSetkeyContacts.fieldByName("physical_address");
                    keyContacts.status = resultSetkeyContacts.fieldByName("status");
                    keyContacts.created_at = resultSetkeyContacts.fieldByName("created_at");
                    keyContacts.updated_at = resultSetkeyContacts.fieldByName("updated_at");
                    keyContactsArray.push(keyContacts);
                    resultSetkeyContacts.next();
                    Ti.API.info("keyContactsArray " + JSON.stringify(keyContactsArray));
                }
                dataobj.key_contacts = keyContactsArray;
            }
            contactsArray.push(dataobj);
            Ti.API.info("keyContactsArraydsfdsfadsfads " + JSON.stringify(contactsArray));
            resultSet.next();
        }
    } catch (err) {} finally {
        db && db.close();
    }
    return contactsArray;
};

exports.deleteGarbageContacts = function(contactsData) {
    Ti.API.info("Delete garbage contacts data in Database  : " + JSON.stringify(contactsData));
    try {
        db = Ti.Database.open("VolunteerData");
        for (var i = 0; i < contactsData.length; i++) {
            var contact = contactsData[i];
            db.execute("DELETE from Contacts where contact_id=?", contact.contact_id);
            db.execute("DELETE from keyContacts where contact_master_id=?", contact.contact_id);
        }
    } catch (dberror) {} finally {
        db && db.close();
    }
};

exports.Save_CategoriesAllList = function(categoriesData) {
    Ti.API.info("VolunteerJsonArray Category : " + JSON.stringify(categoriesData));
    try {
        db = Ti.Database.open("VolunteerData");
        for (var i = 0; i < categoriesData.length; i++) {
            var categories = categoriesData[i];
            Ti.API.info("contacts RecordStatus: " + categories.record_status);
            if ("a" == categories.record_status) {
                Ti.API.info("Check Insert");
                db.execute("INSERT INTO Categories(category_id,name,description,parent_id,priority,image,status,delete_date,created_at,updated_at) VALUES (?,?,?,?,?,?,?,?,?,?)", categories.category_id, categories.name, categories.description, categories.parent_id, categories.priority, categories.image, categories.status, categories.delete_date, categories.created_at, categories.updated_at);
            } else if ("u" == categories.record_status) {
                Ti.API.info("Check Update");
                var categoriesResultSet = db.execute("SELECT * FROM Categories WHERE category_id=" + categories.category_id);
                null != categoriesResultSet && categoriesResultSet.rowCount > 0 ? db.execute("UPDATE Categories SET name=?,description=?,parent_id=?,priority=?,image=?,status=?,delete_date=?,created_at=?,updated_at=? WHERE category_id=" + categories.category_id, categories.name, categories.description, categories.parent_id, categories.priority, categories.image, categories.status, categories.delete_date, categories.created_at, categories.updated_at) : db.execute("INSERT INTO Categories(category_id,name,description,parent_id,priority,image,status,delete_date,created_at,updated_at) VALUES (?,?,?,?,?,?,?,?,?,?)", categories.category_id, categories.name, categories.description, categories.parent_id, categories.priority, categories.image, categories.status, categories.delete_date, categories.created_at, categories.updated_at);
            } else if ("d" == categories.record_status) {
                Ti.API.info("Check Delete");
                db.execute("DELETE from Categories where category_id=?", categories.category_id);
            }
        }
    } catch (dberror) {} finally {
        db && db.close();
    }
};

exports.Get_categoriesAllList = function() {
    var categoriesArray = new Array();
    var resultSet;
    try {
        db = Titanium.Database.open("VolunteerData");
        resultSet = db.execute("SELECT * FROM Categories");
        Ti.API.info("resultset Categories:" + JSON.stringify(resultSet));
        while (resultSet.isValidRow()) {
            var dataobj = {};
            dataobj.category_id = resultSet.fieldByName("category_id");
            dataobj.name = resultSet.fieldByName("name");
            dataobj.description = resultSet.fieldByName("description");
            dataobj.parent_id = resultSet.fieldByName("parent_id");
            dataobj.priority = resultSet.fieldByName("priority");
            dataobj.image = resultSet.fieldByName("image");
            dataobj.status = resultSet.fieldByName("status");
            dataobj.delete_date = resultSet.fieldByName("delete_date");
            dataobj.created_at = resultSet.fieldByName("created_at");
            dataobj.updated_at = resultSet.fieldByName("updated_at");
            categoriesArray.push(dataobj);
            Ti.API.info("categoriesArray : " + JSON.stringify(categoriesArray));
            resultSet.next();
        }
    } catch (err) {} finally {
        db && db.close();
    }
    return categoriesArray;
};

exports.Save_LocationAllList = function(locationData) {
    Ti.API.info("VolunteerJsonArray locationData : " + JSON.stringify(locationData));
    try {
        db = Ti.Database.open("VolunteerData");
        for (var i = 0; i < locationData.length; i++) {
            var location = locationData[i];
            Ti.API.info("contacts RecordStatus: " + location.record_status);
            if ("a" == location.record_status) {
                Ti.API.info("Check Insert");
                db.execute("INSERT INTO Location(location_id,location_name,status,created_at,updated_at,delete_date) VALUES (?,?,?,?,?,?)", location.location_id, location.location_name, location.status, location.created_at, location.updated_at, location.delete_date);
            } else if ("u" == location.record_status) {
                Ti.API.info("Check Update");
                var locationResultSet = db.execute("SELECT * FROM Location WHERE location_id=" + location.location_id);
                null != locationResultSet && locationResultSet.rowCount > 0 ? db.execute("UPDATE Location SET location_name=?,status=?,created_at=?,updated_at=?,delete_date=? WHERE location_id=" + location.location_id, location.location_name, location.status, location.created_at, location.updated_at, location.delete_date) : db.execute("INSERT INTO Location(location_id,location_name,status,created_at,updated_at,delete_date) VALUES (?,?,?,?,?,?)", location.location_id, location.location_name, location.status, location.created_at, location.updated_at, location.delete_date);
            } else if ("d" == location.record_status) {
                Ti.API.info("Check Delete");
                db.execute("DELETE from Location where location_id=?", location.location_id);
            }
        }
    } catch (dberror) {} finally {
        db && db.close();
    }
};

exports.Get_locationAllList = function() {
    var locationArray = new Array();
    var resultSet;
    try {
        db = Titanium.Database.open("VolunteerData");
        resultSet = db.execute("SELECT * FROM Location order by location_name asc");
        Ti.API.info("resultset Location:" + JSON.stringify(resultSet));
        while (resultSet.isValidRow()) {
            var dataobj = {};
            dataobj.location_id = resultSet.fieldByName("location_id");
            dataobj.location_name = resultSet.fieldByName("location_name");
            dataobj.status = resultSet.fieldByName("status");
            dataobj.created_at = resultSet.fieldByName("created_at");
            dataobj.updated_at = resultSet.fieldByName("updated_at");
            dataobj.delete_date = resultSet.fieldByName("delete_date");
            locationArray.push(dataobj);
            Ti.API.info("locationArray : " + JSON.stringify(locationArray));
            resultSet.next();
        }
    } catch (err) {} finally {
        db && db.close();
    }
    return locationArray;
};

exports.Save_UserAllList = function(usersData) {
    Ti.API.info("VolunteerJsonArray userData : " + JSON.stringify(usersData));
    try {
        db = Ti.Database.open("VolunteerData");
        for (var i = 0; i < usersData.length; i++) {
            var users = usersData[i];
            Ti.API.info("contacts RecordStatus: " + users.record_status);
            if ("a" == users.record_status) {
                Ti.API.info("Check Insert");
                db.execute("INSERT INTO Users(user_id,type,first_name,last_name,phone,email,username,password,sex,dob,image,country,lattitude,longitude,user_role,assignment_code,assignment_country,position_start_date,position_end_date,status,delete_date) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", users.user_id, users.type, users.first_name, users.last_name, users.phone, users.email, users.username, users.password, users.sex, users.dob, users.image, users.country, users.lattitude, users.longitude, users.user_role, users.assignment_code, users.assignment_country, users.position_start_date, users.position_end_date, users.status, users.delete_date);
            } else if ("u" == users.record_status) {
                Ti.API.info("Check Update");
                var userResultSet = db.execute("SELECT * FROM Users WHERE user_id=" + users.user_id);
                null != userResultSet && userResultSet.rowCount > 0 ? db.execute("UPDATE Users SET type=?,first_name=?,last_name=?,phone=?,email=?,username=?,password=?,sex=?,dob=?,image=?,country=?,lattitude=?,longitude=?,user_role=?,assignment_code=?,assignment_country=?,position_start_date=?,position_end_date=?,status=?,delete_date=? WHERE user_id=" + users.user_id, users.type, users.first_name, users.last_name, users.phone, users.email, users.username, users.password, users.sex, users.dob, users.image, users.country, users.lattitude, users.longitude, users.user_role, users.assignment_code, users.assignment_country, users.position_start_date, users.position_end_date, users.status, users.delete_date) : db.execute("INSERT INTO Users(user_id,type,first_name,last_name,phone,email,username,password,sex,dob,image,country,lattitude,longitude,user_role,assignment_code,assignment_country,position_start_date,position_end_date,status,delete_date) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", users.user_id, users.type, users.first_name, users.last_name, users.phone, users.email, users.username, users.password, users.sex, users.dob, users.image, users.country, users.lattitude, users.longitude, users.user_role, users.assignment_code, users.assignment_country, users.position_start_date, users.position_end_date, users.status, users.delete_date);
            } else if ("d" == users.record_status) {
                Ti.API.info("Check Delete");
                db.execute("DELETE from Users where user_id=?", users.user_id);
            }
        }
    } catch (dberror) {} finally {
        db && db.close();
    }
};

exports.Get_usersAllList = function() {
    var usersArray = new Array();
    var resultSet;
    try {
        db = Titanium.Database.open("VolunteerData");
        resultSet = db.execute("SELECT * FROM Users");
        Ti.API.info("resultset Users:" + JSON.stringify(resultSet));
        while (resultSet.isValidRow()) {
            var dataobj = {};
            dataobj.user_id = resultSet.fieldByName("user_id");
            dataobj.type = resultSet.fieldByName("type");
            dataobj.first_name = resultSet.fieldByName("first_name");
            dataobj.last_name = resultSet.fieldByName("last_name");
            dataobj.phone = resultSet.fieldByName("phone");
            dataobj.email = resultSet.fieldByName("email");
            dataobj.username = resultSet.fieldByName("username");
            dataobj.password = resultSet.fieldByName("password");
            dataobj.sex = resultSet.fieldByName("sex");
            dataobj.dob = resultSet.fieldByName("dob");
            dataobj.image = resultSet.fieldByName("image");
            dataobj.country = resultSet.fieldByName("country");
            dataobj.lattitude = resultSet.fieldByName("lattitude");
            dataobj.longitude = resultSet.fieldByName("longitude");
            dataobj.user_role = resultSet.fieldByName("user_role");
            dataobj.assignment_code = resultSet.fieldByName("assignment_code");
            dataobj.assignment_country = resultSet.fieldByName("assignment_country");
            dataobj.position_start_date = resultSet.fieldByName("position_start_date");
            dataobj.position_end_date = resultSet.fieldByName("position_end_date");
            dataobj.status = resultSet.fieldByName("status");
            dataobj.delete_date = resultSet.fieldByName("delete_date");
            usersArray.push(dataobj);
            Ti.API.info("usersArray : " + JSON.stringify(usersArray));
            resultSet.next();
        }
    } catch (err) {} finally {
        db && db.close();
    }
    return usersArray;
};

exports.Save_NotificationAllList = function(notificationData) {
    Ti.API.info("VolunteerJsonArray notificationData : " + JSON.stringify(notificationData));
    try {
        db = Ti.Database.open("VolunteerData");
        for (var i = 0; i < notificationData.length; i++) {
            var notification = notificationData[i];
            Ti.API.info("contacts RecordStatus: " + notification.record_status);
            if ("a" == notification.record_status) {
                Ti.API.info("Check Insert");
                db.execute("INSERT INTO Notification(notification_id,location,location_type,notification_category,notification_type,notification_title,notification_description,notification_status,notification_link,link_ids,created_at,updated_at,delete_date,status,read_status) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", notification.notification_id, notification.location, notification.location_type, notification.notification_category, notification.notification_type, notification.notification_title, notification.notification_description, notification.notification_status, notification.notification_link, notification.link_ids, notification.created_at, notification.updated_at, notification.delete_date, notification.status, notification.read_status);
            } else if ("u" == notification.record_status) {
                Ti.API.info("Check Update");
                var notificationResultSet = db.execute("SELECT * FROM Notification WHERE notification_id=" + notification.notification_id);
                null != notificationResultSet && notificationResultSet.rowCount > 0 ? db.execute("UPDATE Notification SET location=?,location_type=?,notification_category=?,notification_type=?,notification_title=?,notification_description=?,notification_status=?,notification_link=?,link_ids=?,created_at=?,updated_at=?,delete_date=?,status=?,read_status=? WHERE notification_id=" + notification.notification_id, notification.location, notification.location_type, notification.notification_category, notification.notification_type, notification.notification_title, notification.notification_description, notification.notification_status, notification.notification_link, notification.link_ids, notification.created_at, notification.updated_at, notification.delete_date, notification.status, notification.read_status) : db.execute("INSERT INTO Notification(notification_id,location,location_type,notification_category,notification_type,notification_title,notification_description,notification_status,notification_link,link_ids,created_at,updated_at,delete_date,status,read_status) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", notification.notification_id, notification.location, notification.location_type, notification.notification_category, notification.notification_type, notification.notification_title, notification.notification_description, notification.notification_status, notification.notification_link, notification.link_ids, notification.created_at, notification.updated_at, notification.delete_date, notification.status, notification.read_status);
            } else if ("d" == notification.record_status) {
                Ti.API.info("Check Delete");
                db.execute("DELETE from Notification where notification_id=?", notification.notification_id);
            }
        }
    } catch (dberror) {} finally {
        db && db.close();
    }
};

exports.Save_NotificationAsRead = function(notificationId) {
    try {
        db = Ti.Database.open("VolunteerData");
        db.execute("UPDATE Notification SET read_status=1 WHERE notification_id=" + notificationId);
    } catch (dberror) {} finally {
        db && db.close();
    }
};

exports.Get_NotificationAllList = function() {
    var notificationArray = new Array();
    var resultSet;
    try {
        db = Titanium.Database.open("VolunteerData");
        resultSet = db.execute("SELECT * FROM Notification order by created_at desc");
        Ti.API.info("resultset Notification:" + JSON.stringify(resultSet));
        while (resultSet.isValidRow()) {
            var dataobj = {};
            dataobj.notification_id = resultSet.fieldByName("notification_id");
            dataobj.location = resultSet.fieldByName("location");
            dataobj.location_type = resultSet.fieldByName("location_type");
            dataobj.notification_category = resultSet.fieldByName("notification_category");
            dataobj.notification_type = resultSet.fieldByName("notification_type");
            dataobj.notification_title = resultSet.fieldByName("notification_title");
            dataobj.notification_description = resultSet.fieldByName("notification_description");
            dataobj.notification_status = resultSet.fieldByName("notification_status");
            dataobj.notification_link = resultSet.fieldByName("notification_link");
            dataobj.link_ids = resultSet.fieldByName("link_ids");
            dataobj.created_at = resultSet.fieldByName("created_at");
            dataobj.updated_at = resultSet.fieldByName("updated_at");
            dataobj.delete_date = resultSet.fieldByName("delete_date");
            dataobj.status = resultSet.fieldByName("status");
            dataobj.read_status = resultSet.fieldByName("read_status");
            notificationArray.push(dataobj);
            resultSet.next();
        }
    } catch (err) {} finally {
        db && db.close();
    }
    return notificationArray;
};

exports.cleanDatabase = function() {
    try {
        db = Titanium.Database.open("VolunteerData");
        db.close();
        db.remove();
        db = Titanium.Database.install("/VolunteerData1.sqlite", "VolunteerData");
        Alloy.Globals.db = db;
        Ti.App.Properties.setString("lastDateTimeGetVolunteerData", null);
    } catch (e) {}
};