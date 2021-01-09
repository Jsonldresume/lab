import * as _  from 'lodash';
import { v4 as uuidv4 } from 'uuid';

const Jsonize = ( variable ) => {
	let jsonizedVar = variable;
	if(typeof variable === 'object' && variable !== null){
		
	}else{
		jsonizedVar = JSON.parse(variable);
	}
	return jsonizedVar;
};

const mapPerson = (jsonRxResume, jsonldresume, person) => {
	
	let firstname = _.get(jsonRxResume, 'profile["firstName"]', '');
	_.set(person, 'givenName[0]["@value"]',firstname);
	
	_.set(person, 'givenName[0]["@language"]','en');
	
	
	
	
	return person;
};

const mapResume = (jsonRxResume, jsonldresume, resume) => {
	return resume;
};

export const rxResumetoJsonld = ( rxResume ) => {
	let personId = uuidv4();
	let jsonRxResume = Jsonize(rxResume);
	let jsonldresume = {
		"@context": [
			"https://jsonldresume.github.io/skill/context.json",
			{
				"gender": {
					"@id": "schema:gender",
					"@type": "@vocab"
				},
				"skill:classOfAward": {
					"@id": "skill:classOfAward",
					"@type": "@vocab"
				},
				"skill:securityClearance": {
					"@id": "skill:securityClearance",
					"@type": "@vocab"
				},
				"category": {
					"@id": "schema:category",
					"@type": "@vocab"
				},
				"dayOfWeek": {
					"@id": "schema:dayOfWeek",
					"@type": "@vocab"
				}
			}
		],
		"@graph": [
		]
	};
	let resume = {
		"@type": "skill:Resume"
	};
	let person = {
		"@type": "Person"
	};
	
	resume = mapResume(jsonRxResume, jsonldresume, resume);
	resume["@id"] = _.get(jsonRxResume+'?resume', 'profile.website', '_:'+personId+'?resume');
	
	person["@id"] = _.get(jsonRxResume, 'profile.website', '_:'+personId);
	person = mapPerson(jsonRxResume, jsonldresume, person);
	
	jsonldresume["@graph"].push(resume);
	jsonldresume["@graph"].push(person);
	
	return jsonldresume;
};