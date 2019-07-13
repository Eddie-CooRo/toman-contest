import React from 'react'
import { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'

export class Node extends Component {

  renderChild = childId => {
    const { id } = this.props
    return (
        <ConnectedNode key={childId} id={childId} parentId={id} />
    )
  }

  render() {
    const { id, counter, parentId, childIds, name , isDir } = this.props
    if (isDir){
      return (
      <li key={counter}>
        <label htmlFor={name.replace(' ', '_')}>
          {name}
          {
            <>
              <span 
                id={`remove_${id}`}
                className="action-button">
                ×
              </span>
              <span 
                id={`add_child_file_${id}`}
                className="action-button">
                📄
              </span>
              <span 
                id={`add_child_folder_${id}`}
                className="action-button">
                📂
              </span>
            </>
          }
        </label> 
        <input type="checkbox" id={toString(id).replace(' ', '_')} /> 
        <ol>
          {childIds.map(this.renderChild)}
        </ol>
      </li>
      )
    }
    else{
      return (
        <li key={counter} className="file">
          <a
            id={`select_current_edit_${id}`}
            className="file-name" >
            {name}
          </a>
          {typeof parentId !== 'undefined' &&
            <span
              id={`remove_${id}`}
              className="action-button">
              ×
            </span>
          }
        </li>
      )
    }
  }
}

function mapStateToProps(state, ownProps) {
  return {
    editNode: state.editNode,
    ...state.nodes[ownProps.id]
  }
}

const ConnectedNode = connect(mapStateToProps, actions)(Node)
export default ConnectedNode
