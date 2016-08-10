var mapLabelToResource = {};
var mapUriToResource = {};

function clean(canonicalLabel) {
    return canonicalLabel.replace(' ', '').toLowerCase();
}


function getResourceProperty(subjectResource, subjectLabel, predicateResource, predicateLabel, callback) {
    var result = {
        'subject': {
            'rdf-uri': subjectResource.definitionUri,
            'rdfs:label': subjectResource['rdfs:label.en']
        },
        'predicate': {
            'rdf-uri': predicateResource.definitionUri,
            'rdfs:label': predicateResource['rdfs:label.en']
        }
    };

    var list = subjectResource[predicateResource.definitionUri];
    if (!list) {
        list = [];
    }

    result.objectList = [];
    list.forEach(function (object) {
        result.objectList.push({
                'rdf-uri': object.definitionUri,
                'rdfs:label': object['rdfs:label.en']
            }
        );
    });

    callback(null, result);

}

function processLabelQuery(subjectLabel, predicateLabel, callback) {
    findByLabel(clean(subjectLabel), function(err, subjectResource) {

        if (err) {
            callback('Could not find subject ' + err);
        } else {

            findByLabel(clean(predicateLabel), function(err, predicateResource) {
                if (err) {
                    callback(err);
                } else {

                    getResourceProperty(subjectResource, subjectLabel, predicateResource, predicateLabel, function(err, result) {
                        if (err) {
                            callback(err);
                        } else {
                            callback(null, result);
                        }
                    });

                }
            });
        }

    });
    var predicateResource = findByLabel(clean(predicateLabel));

}

function findByLabel(rdfsLabel, callback) {
    var cleanLabel = clean(rdfsLabel);
    var result = mapLabelToResource[cleanLabel];

    if (result) {
        callback(null, result);
    } else {
        callback(new Error('Could not find resource by label:' + rdfsLabel));
    }
}

function relate(subjectResource, predicateResource, objectResource) {
    var predicateValueList = subjectResource[predicateResource.definitionUri];

    if (!predicateValueList) {
        predicateValueList = [];
        subjectResource[predicateResource.definitionUri] = predicateValueList;
    }

    predicateValueList.push(objectResource);
}

function resource(resourceUri, englishRdfsLabel, alternativeLabel) {
    var resource = {
        'definitionUri': resourceUri,
        'rdfs:label.en': englishRdfsLabel
    };

    mapUriToResource[resourceUri] = resource;
    if (englishRdfsLabel) {
        resource['rdfs:label.en'] = englishRdfsLabel;
        mapLabelToResource[clean(englishRdfsLabel)] = resource;
    }

    if (alternativeLabel) {
        mapLabelToResource[clean(alternativeLabel)] = resource;
    }

    return resource;
}

function getResourceByUri (uri) {
    return mapUriToResource[uri];
}

var nationalLanguage = resource('http://www.corefoo.org/ont/geo/nationalLanguage', 'national language');
var norwich_uk = resource('https://www.wikidata.org/entity/Q130191', 'Norwich, UK');
var rainbird_company = resource('http://www.corefoo.org/ont/uk-company#08599568', 'Rainbird Technologies Ltd');
var linkToBlog = resource('http://xmlns.com/foaf/0.1/weblog', 'blog');
relate(rainbird_company, linkToBlog, resource('http://rainbird.ai/blog'));

var english = resource('https://www.wikidata.org/entity/Q1860', 'English');
var country;

country = resource('https://www.wikidata.org/entity/Q21', 'England', 'inkgland');
relate(country, nationalLanguage, english);



country = resource('https://www.wikidata.org/entity/Q889', 'Afghanistan');
country = resource('https://www.wikidata.org/entity/Q222', 'Albania');
country = resource('https://www.wikidata.org/entity/Q262', 'Algeria');
country = resource('https://www.wikidata.org/entity/Q228', 'Andorra');
country = resource('https://www.wikidata.org/entity/Q916', 'Angola');
country = resource('https://www.wikidata.org/entity/Q414', 'Argentina');
country = resource('https://www.wikidata.org/entity/Q399', 'Armenia');
country = resource('https://www.wikidata.org/entity/Q408', 'Australia');
country = resource('https://www.wikidata.org/entity/Q40', 'Austria');
country = resource('https://www.wikidata.org/entity/Q227', 'Azerbaijan');
country = resource('https://www.wikidata.org/entity/Q398', 'Bahrain');
country = resource('https://www.wikidata.org/entity/Q902', 'Bangladesh');
country = resource('https://www.wikidata.org/entity/Q244', 'Barbados');
country = resource('https://www.wikidata.org/entity/Q184', 'Belarus');
country = resource('https://www.wikidata.org/entity/Q31', 'Belgium');
country = resource('https://www.wikidata.org/entity/Q242', 'Belize');
country = resource('https://www.wikidata.org/entity/Q962', 'Benin');
country = resource('https://www.wikidata.org/entity/Q917', 'Bhutan');
country = resource('https://www.wikidata.org/entity/Q750', 'Bolivia');
country = resource('https://www.wikidata.org/entity/Q225', 'Bosnia and Herzegovina');
country = resource('https://www.wikidata.org/entity/Q963', 'Botswana');
country = resource('https://www.wikidata.org/entity/Q155', 'Brazil');
country = resource('https://www.wikidata.org/entity/Q921', 'Brunei');
country = resource('https://www.wikidata.org/entity/Q219', 'Bulgaria');
country = resource('https://www.wikidata.org/entity/Q965', 'Burkina Faso');
country = resource('https://www.wikidata.org/entity/Q967', 'Burundi');
country = resource('https://www.wikidata.org/entity/Q424', 'Cambodia');
country = resource('https://www.wikidata.org/entity/Q1009', 'Cameroon');
country = resource('https://www.wikidata.org/entity/Q16', 'Canada');
country = resource('https://www.wikidata.org/entity/Q1011', 'Cape Verde');
country = resource('https://www.wikidata.org/entity/Q929', 'Central African Republic');
country = resource('https://www.wikidata.org/entity/Q657', 'Chad');
country = resource('https://www.wikidata.org/entity/Q298', 'Chile');
country = resource('https://www.wikidata.org/entity/Q739', 'Colombia');
country = resource('https://www.wikidata.org/entity/Q970', 'Comoros');
country = resource('https://www.wikidata.org/entity/Q800', 'Costa Rica');
country = resource('https://www.wikidata.org/entity/Q224', 'Croatia');
country = resource('https://www.wikidata.org/entity/Q241', 'Cuba');
country = resource('https://www.wikidata.org/entity/Q229', 'Cyprus');
country = resource('https://www.wikidata.org/entity/Q213', 'Czech Republic');
country = resource('https://www.wikidata.org/entity/Q1008', 'Côte d\'Ivoire');
country = resource('https://www.wikidata.org/entity/Q974', 'Democratic Republic of the Congo');
country = resource('https://www.wikidata.org/entity/Q35', 'Denmark');
country = resource('https://www.wikidata.org/entity/Q977', 'Djibouti');
country = resource('https://www.wikidata.org/entity/Q784', 'Dominica');
country = resource('https://www.wikidata.org/entity/Q786', 'Dominican Republic');
country = resource('https://www.wikidata.org/entity/Q574', 'East Timor');
country = resource('https://www.wikidata.org/entity/Q736', 'Ecuador');
country = resource('https://www.wikidata.org/entity/Q79', 'Egypt');
country = resource('https://www.wikidata.org/entity/Q792', 'El Salvador');
country = resource('https://www.wikidata.org/entity/Q983', 'Equatorial Guinea');
country = resource('https://www.wikidata.org/entity/Q986', 'Eritrea');
country = resource('https://www.wikidata.org/entity/Q191', 'Estonia');
country = resource('https://www.wikidata.org/entity/Q115', 'Ethiopia');
country = resource('https://www.wikidata.org/entity/Q702', 'Federated States of Micronesia');
country = resource('https://www.wikidata.org/entity/Q712', 'Fiji');
country = resource('https://www.wikidata.org/entity/Q33', 'Finland');
country = resource('https://www.wikidata.org/entity/Q142', 'France');
country = resource('https://www.wikidata.org/entity/Q1000', 'Gabon');
country = resource('https://www.wikidata.org/entity/Q1005', 'Gambia');
country = resource('https://www.wikidata.org/entity/Q230', 'Georgia');
country = resource('https://www.wikidata.org/entity/Q183', 'Germany');
country = resource('https://www.wikidata.org/entity/Q117', 'Ghana');
country = resource('https://www.wikidata.org/entity/Q41', 'Greece');
country = resource('https://www.wikidata.org/entity/Q774', 'Guatemala');
country = resource('https://www.wikidata.org/entity/Q1006', 'Guinea');
country = resource('https://www.wikidata.org/entity/Q1007', 'Guinea-Bissau');
country = resource('https://www.wikidata.org/entity/Q734', 'Guyana');
country = resource('https://www.wikidata.org/entity/Q790', 'Haiti');
country = resource('https://www.wikidata.org/entity/Q783', 'Honduras');
country = resource('https://www.wikidata.org/entity/Q28', 'Hungary');
country = resource('https://www.wikidata.org/entity/Q189', 'Iceland');
country = resource('https://www.wikidata.org/entity/Q668', 'India');
country = resource('https://www.wikidata.org/entity/Q252', 'Indonesia');
country = resource('https://www.wikidata.org/entity/Q794', 'Iran');
country = resource('https://www.wikidata.org/entity/Q796', 'Iraq');
country = resource('https://www.wikidata.org/entity/Q27', 'Ireland');
country = resource('https://www.wikidata.org/entity/Q801', 'Israel');
country = resource('https://www.wikidata.org/entity/Q38', 'Italy');
country = resource('https://www.wikidata.org/entity/Q17', 'Japan');
country = resource('https://www.wikidata.org/entity/Q810', 'Jordan');
country = resource('https://www.wikidata.org/entity/Q232', 'Kazakhstan');
country = resource('https://www.wikidata.org/entity/Q114', 'Kenya');
country = resource('https://www.wikidata.org/entity/Q756617', 'Kingdom of Denmark');
country = resource('https://www.wikidata.org/entity/Q29999', 'Kingdom of the Netherlands');
country = resource('https://www.wikidata.org/entity/Q710', 'Kiribati');
country = resource('https://www.wikidata.org/entity/Q817', 'Kuwait');
country = resource('https://www.wikidata.org/entity/Q813', 'Kyrgyzstan');
country = resource('https://www.wikidata.org/entity/Q819', 'Laos');
country = resource('https://www.wikidata.org/entity/Q211', 'Latvia');
country = resource('https://www.wikidata.org/entity/Q822', 'Lebanon');
country = resource('https://www.wikidata.org/entity/Q1013', 'Lesotho');
country = resource('https://www.wikidata.org/entity/Q1014', 'Liberia');
country = resource('https://www.wikidata.org/entity/Q1016', 'Libya');
country = resource('https://www.wikidata.org/entity/Q347', 'Liechtenstein');
country = resource('https://www.wikidata.org/entity/Q37', 'Lithuania');
country = resource('https://www.wikidata.org/entity/Q1019', 'Madagascar');
country = resource('https://www.wikidata.org/entity/Q1020', 'Malawi');
country = resource('https://www.wikidata.org/entity/Q833', 'Malaysia');
country = resource('https://www.wikidata.org/entity/Q826', 'Maldives');
country = resource('https://www.wikidata.org/entity/Q912', 'Mali');
country = resource('https://www.wikidata.org/entity/Q233', 'Malta');
country = resource('https://www.wikidata.org/entity/Q709', 'Marshall Islands');
country = resource('https://www.wikidata.org/entity/Q1025', 'Mauritania');
country = resource('https://www.wikidata.org/entity/Q1027', 'Mauritius');
country = resource('https://www.wikidata.org/entity/Q96', 'Mexico');
country = resource('https://www.wikidata.org/entity/Q217', 'Moldova');
country = resource('https://www.wikidata.org/entity/Q235', 'Monaco');
country = resource('https://www.wikidata.org/entity/Q711', 'Mongolia');
country = resource('https://www.wikidata.org/entity/Q236', 'Montenegro');
country = resource('https://www.wikidata.org/entity/Q1028', 'Morocco');
country = resource('https://www.wikidata.org/entity/Q1029', 'Mozambique');
country = resource('https://www.wikidata.org/entity/Q836', 'Myanmar');
country = resource('https://www.wikidata.org/entity/Q1030', 'Namibia');
country = resource('https://www.wikidata.org/entity/Q697', 'Nauru');
country = resource('https://www.wikidata.org/entity/Q837', 'Nepal');
country = resource('https://www.wikidata.org/entity/Q664', 'New Zealand');
country = resource('https://www.wikidata.org/entity/Q811', 'Nicaragua');
country = resource('https://www.wikidata.org/entity/Q1032', 'Niger');
country = resource('https://www.wikidata.org/entity/Q1033', 'Nigeria');
country = resource('https://www.wikidata.org/entity/Q34020', 'Niue');
country = resource('https://www.wikidata.org/entity/Q423', 'North Korea');
country = resource('https://www.wikidata.org/entity/Q20', 'Norway');
country = resource('https://www.wikidata.org/entity/Q842', 'Oman');
country = resource('https://www.wikidata.org/entity/Q843', 'Pakistan');
country = resource('https://www.wikidata.org/entity/Q695', 'Palau');
country = resource('https://www.wikidata.org/entity/Q804', 'Panama');
country = resource('https://www.wikidata.org/entity/Q691', 'Papua New Guinea');
country = resource('https://www.wikidata.org/entity/Q733', 'Paraguay');
country = resource('https://www.wikidata.org/entity/Q148', 'People\'s Republic of China');
country = resource('https://www.wikidata.org/entity/Q419', 'Peru');
country = resource('https://www.wikidata.org/entity/Q928', 'Philippines');
country = resource('https://www.wikidata.org/entity/Q36', 'Poland');
country = resource('https://www.wikidata.org/entity/Q45', 'Portugal');
country = resource('https://www.wikidata.org/entity/Q846', 'Qatar');
country = resource('https://www.wikidata.org/entity/Q221', 'Republic of Macedonia');
country = resource('https://www.wikidata.org/entity/Q971', 'Republic of the Congo');
country = resource('https://www.wikidata.org/entity/Q218', 'Romania');
country = resource('https://www.wikidata.org/entity/Q159', 'Russia');
country = resource('https://www.wikidata.org/entity/Q1037', 'Rwanda');
country = resource('https://www.wikidata.org/entity/Q683', 'Samoa');
country = resource('https://www.wikidata.org/entity/Q238', 'San Marino');
country = resource('https://www.wikidata.org/entity/Q1039', 'Sao Tomé and Príncipe');
country = resource('https://www.wikidata.org/entity/Q851', 'Saudi Arabia');
country = resource('https://www.wikidata.org/entity/Q1041', 'Senegal');
country = resource('https://www.wikidata.org/entity/Q403', 'Serbia');
country = resource('https://www.wikidata.org/entity/Q1042', 'Seychelles');
country = resource('https://www.wikidata.org/entity/Q1044', 'Sierra Leone');
country = resource('https://www.wikidata.org/entity/Q334', 'Singapore');
country = resource('https://www.wikidata.org/entity/Q214', 'Slovakia');
country = resource('https://www.wikidata.org/entity/Q215', 'Slovenia');
country = resource('https://www.wikidata.org/entity/Q685', 'Solomon Islands');
country = resource('https://www.wikidata.org/entity/Q1045', 'Somalia');
country = resource('https://www.wikidata.org/entity/Q29', 'Spain');
country = resource('https://www.wikidata.org/entity/Q258', 'South Africa');
country = resource('https://www.wikidata.org/entity/Q884', 'South Korea');
country = resource('https://www.wikidata.org/entity/Q958', 'South Sudan');
country = resource('https://www.wikidata.org/entity/Q854', 'Sri Lanka');
country = resource('https://www.wikidata.org/entity/Q1049', 'Sudan');
country = resource('https://www.wikidata.org/entity/Q730', 'Suriname');
country = resource('https://www.wikidata.org/entity/Q1050', 'Swaziland');
country = resource('https://www.wikidata.org/entity/Q34', 'Sweden');
country = resource('https://www.wikidata.org/entity/Q39', 'Switzerland');
country = resource('https://www.wikidata.org/entity/Q858', 'Syria');
country = resource('https://www.wikidata.org/entity/Q863', 'Tajikistan');
country = resource('https://www.wikidata.org/entity/Q924', 'Tanzania');
country = resource('https://www.wikidata.org/entity/Q869', 'Thailand');
country = resource('https://www.wikidata.org/entity/Q945', 'Togo');
country = resource('https://www.wikidata.org/entity/Q678', 'Tonga');
country = resource('https://www.wikidata.org/entity/Q754', 'Trinidad and Tobago');
country = resource('https://www.wikidata.org/entity/Q948', 'Tunisia');
country = resource('https://www.wikidata.org/entity/Q43', 'Turkey');
country = resource('https://www.wikidata.org/entity/Q874', 'Turkmenistan');
country = resource('https://www.wikidata.org/entity/Q672', 'Tuvalu');
country = resource('https://www.wikidata.org/entity/Q1036', 'Uganda');
country = resource('https://www.wikidata.org/entity/Q212', 'Ukraine');
country = resource('https://www.wikidata.org/entity/Q878', 'United Arab Emirates');
country = resource('https://www.wikidata.org/entity/Q30', 'United States of America');
country = resource('https://www.wikidata.org/entity/Q77', 'Uruguay');
country = resource('https://www.wikidata.org/entity/Q265', 'Uzbekistan');
country = resource('https://www.wikidata.org/entity/Q686', 'Vanuatu');
country = resource('https://www.wikidata.org/entity/Q237', 'Vatican City');
country = resource('https://www.wikidata.org/entity/Q717', 'Venezuela');
country = resource('https://www.wikidata.org/entity/Q881', 'Vietnam');
country = resource('https://www.wikidata.org/entity/Q805', 'Yemen');
country = resource('https://www.wikidata.org/entity/Q953', 'Zambia');
country = resource('https://www.wikidata.org/entity/Q954', 'Zimbabwe');

module.exports.processLabelQuery = processLabelQuery;
module.exports.createResource = resource;
module.exports.relate = relate;
module.exports.getResourceByUri = getResourceByUri;

require('./geopop');
