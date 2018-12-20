import React from 'react';
import Button from './Button';

const List = ({ list, onDismiss }) => (
  <div className="list">
    {list.map(item => (
      <div key={item.objectID} className="list-row">
        <span style={{ width: '40%' }}>
          <a href={item.url}> {item.title || 'No Title'}</a>
        </span>
        <span style={{ width: '30%' }}>{item.author}</span>
        <span style={{ width: '10%' }}>{item.num_comments}</span>
        <span style={{ width: '10%' }}>{item.points}</span>
        <span style={{ width: '10%' }}>
          <Button
            onClick={() => {
              onDismiss(item.objectID);
            }}
            className="button-inline"
          >
            Dismiss
          </Button>
        </span>
      </div>
    ))}
  </div>
);

export default List;