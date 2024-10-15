import Fuse from 'fuse.js'
import * as Constants from './constants.js'

export default function Search(data, nominator, relation, searchTerms) {
  const filterDatasetByNominator = (data, nominator) => {
    if (nominator.length > 0) {
      return data.filter((item) => {
        return nominator.indexOf(item.Nominator) !== -1
      })
    } else {
      return data
    }
  }

  const filterDatasetByRelation = (data, relation) => {
    if (relation.length > 0) {
      return data.filter((item) => {
        //if Other is selected
        if (relation.indexOf('Other (please specify)') !== -1) {
          return Constants.relationOptions.indexOf(item.Relation) === -1
        }
        return relation.indexOf(item.Relation) !== -1
      })
    } else {
      return data
    }
  }

  const options = {
    keys: ['Nominator', 'Functional title', 'Department', 'Organization', 'Name'],
    threshold: 0.2
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
