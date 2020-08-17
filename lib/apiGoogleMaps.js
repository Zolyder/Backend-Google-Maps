'use strict'
const axios = require('axios')
const config = require('../config')

class apiGoogleMaps {
	/**
	* Get geometry with api Place Search
	*
	* @param {string} city
	*/
	static async PlaceSearch (city) {
		try {
			const apiKey = config.googleMaps.apiKey
			const endpoint = `${config.googleMaps.host}/place/findplacefromtext/json`

			const response = await axios({
				method: 'get',
				url: endpoint,
				params: {
					input: city,
					inputtype: 'textquery',
					fields: 'formatted_address,name,geometry',
					key: apiKey
				}
			})

			if (response.data.status !== 'OK') {
				return response.data
			}

			return response.data

		} catch (error) {
			return(error)
		}
	}
}

module.exports = apiGoogleMaps
