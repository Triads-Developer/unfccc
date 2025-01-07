import Fuse from 'fuse.js'
import * as Constants from './constants.js'

export default function Search(data, nominator, relation, searchTerms) {
  const filterDatasetByNominator = (data, nominator) => {
    if (nominator.length > 0) {
      return data.filter((item) => {
        return nominator.indexOf(item['Nominated by']) !== -1
      })
    } else {
      return data
    }
  }

  const filterDatasetByRelation = (data, relation) => {
    if (relation.length > 0) {
      return data.filter((item) => {
        let found = relation.indexOf(item.Relation) !== -1
        //if Other is selected
        if (!found && relation.indexOf('Other (please specify)') !== -1) {
          found = Constants.relationOptions.indexOf(item.Relation) === -1
        }

        return found
      })
    } else {
      return data
    }
  }

  const options = {
    keys: ['Home organization', 'Nominated by', 'Functional title', 'Department', 'Name'],
    threshold: 0.15
  }

  let filteredDataset = filterDatasetByNominator(data, nominator)
  filteredDataset = filterDatasetByRelation(filteredDataset, relation)

  let fuse = new Fuse(filteredDataset, options)
  //if the user didn't enter a search term, then return the full dataset.
  if (!searchTerms) {
    return filteredDataset.map((item) => {
      return {
        ...item,
        id: crypto.randomUUID()
      }
    })
  } else {
    return fuse.search(searchTerms).map((result) => {
      return {
        ...result.item,
        id: result.refIndex
      }
    })
  }
}
