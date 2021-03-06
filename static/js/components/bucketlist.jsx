import React, { Component } from 'react';
import IconButton from 'material-ui/lib/icon-button';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/lib/card';
import FlatButton from 'material-ui/lib/flat-button';
import { List, ListItem } from 'material-ui/lib/lists';
import ImageEdit from 'material-ui/lib/svg-icons/image/edit';
import Delete from 'material-ui/lib/svg-icons/action/delete';
import Badge from 'material-ui/lib/badge';
import Dialog from 'material-ui/lib/dialog';
import TextField from 'material-ui/lib/text-field';
import BucketListItem from './bucketlistitem.jsx';
import Colors from 'material-ui/lib/styles/colors';
import Checkbox from 'material-ui/lib/checkbox';

const style = {
  float: 'right',
  'font-weight': 'normal',
  right: {
    float: 'right',
  },
  itemAction: {
    transform: 'translateY(-35%)',
    float: 'right',
  },
  checkbox: {
    marginBottom: 16,
    width: '50%',
  },
  label: {
    fontWeight: 'normal',
  },
  validationError: {
    float: 'left',
    color: 'red',
    fontSize: '12px',
  },
  card: {
    borderRadius: '5px',
  },
  dialog: {
    margin: '0 auto',
    width: '500px',
  },
  deleteButton: {
    color: 'red',
  },
};

export default class Bucketlist extends Component {
  constructor() {
    super();
    this.state = {
      deleteList: false,
      editName: false,
      showEditDialog: false,
      showDeleteDialog: false,
      newName: '',
      newItemName: '',
      editNameError: false,
      editItemError: false,
      done: false,
    };
        // Bind methods
    this.handleDeleteDialog = this.handleDeleteDialog.bind(this);
    this.handleEditDialog = this.handleEditDialog.bind(this);
    this.handleCancelEdit = this.handleCancelEdit.bind(this);
    this.handleConfirmEdit = this.handleConfirmEdit.bind(this);
    this.handleCancelDelete = this.handleCancelDelete.bind(this);
    this.handleConfirmDelete = this.handleConfirmDelete.bind(this);
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.handleAddItem = this.handleAddItem.bind(this);
    this.handleCheckbox = this.handleCheckbox.bind(this);
    this.makeValueLink = this.makeValueLink.bind(this);
  }

  handleEditDialog() {
    this.setState({
      showEditDialog: !this.state.showEditDialog,
    });
  }

  handleDeleteDialog() {
    this.setState({
      showDeleteDialog: !this.state.showDeleteDialog,
    });
  }
  handleConfirmDelete() {
    this.handleDeleteDialog();
    this.setState({
      deleteList: true,
    }, () => {
      this.handleDelete();
    });
  }
  handleCancelDelete() {
    this.handleDeleteDialog();
    this.setState({
      deleteList: false,
    });
  }

  handleConfirmEdit() {
    if (this.state.newName !== '') {
      this.handleEditDialog();
      this.setState({
        editName: true,
      }, () => {
        this.handleEdit();
      });
    } else {
      this.setState({
        editName: true,
      }, () => {
        this.handleEdit();
      });
    }
  }

  handleCancelEdit() {
    this.handleEditDialog();
    this.setState({
      editName: false,
    });
  }

  handleDelete() {
    if (this.state.deleteList) {
      this.props.onDelete(this.props.bucketlist)
    }
  }

  handleFieldChange(event) {
    event.preventDefault();
    const key = event.target.name;
    const value = event.target.value;
    this.setState({
      [key]: value,
    }, () => {
      if (this.state.newName === '') {
        this.setState({
          editNameError: true,
        });
      } else {
        this.setState({
          editNameError: false,
        });
      }
    });
  }
  handleEdit() {
    if (this.state.editName) {
      this.props.onEdit(this.state.newName, this.props.bucketlist)
    }
  }

  handleAddItem() {
    this.props.onAddItem(this.state.newItemName, this.state.done, this.props.bucketlist)
    this.setState({
      newItemName: '',
      done: false,
    });
  }

  handleCheckbox() {
    const checked = document.getElementById('add-done').checked;
    this.setState({
      done: checked,
    }, () => {
      console.log(this.state.done);
    });
  }

  makeValueLink(key) {
    return {
      value: this.state[key],
      requestChange: (newValue) => {
        const newState = {};
        newState[key] = newValue;
        this.setState(newState);
      },
    };
  }
  renderBucketListItems(bucketlistItems) {
    if (bucketlistItems.length) {
      return bucketlistItems.map((bucketlistItem) => {
        return (bucketlistItem.done) ?
                <BucketListItem itemName={bucketlistItem.item_name}
                  className="item-done"
                  key={bucketlistItem.id}
                  done={bucketlistItem.done}
                  id={bucketlistItem.id} item={bucketlistItem}
                  bucketlist={this.props.bucketlist}
                  onEditItem={this.props.onEditItem}
                  onDeleteItem={this.props.onDeleteItem}
                /> : <BucketListItem itemName={bucketlistItem.item_name}
                  className=""
                  key={bucketlistItem.id}
                  done={bucketlistItem.done}
                  id={bucketlistItem.id} item={bucketlistItem}
                  bucketlist={this.props.bucketlist}
                  onEditItem={this.props.onEditItem}
                  onDeleteItem={this.props.onDeleteItem} />
      });
    } else {
      return (
        <ListItem
          primaryText="No items yet"
          id="list-item"
          disabled={false}
        />
    );
    }
  }

  render() {
    const deleteDialogActions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleCancelDelete}
      />,
      <FlatButton
        label="Delete"
        primary={true}
        onClick={this.handleConfirmDelete}
      />,
    ];
    const editDialogActions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleCancelEdit}
      />,
      <FlatButton
        label="Update"
        primary={true}
        onClick={this.handleConfirmEdit}
      />
    ];
    return (
            <div className="col-xs-12 col-md-4 bucketlist">
                <Card actAsExpander={true}
                  style={style.card}>
                    <CardHeader
                      title={this.props.listName}
                      actAsExpander={true}
                      showExpandableButton={true}
                    >
                    <div>
                      <Badge
                        badgeContent={this.props.items.length}
                        secondary={true}
                        badgeStyle={{ fontSize: 10, marginTop: 10 }}
                        >
                      </Badge>
                      <div style={style.right}>
                        <IconButton
                          touch={true}
                          tooltip="edit"
                          tooltipPosition="top-center"
                          onTouchTap={this.handleEditDialog}
                          ><ImageEdit color={Colors.cyan500}/></IconButton>
                        <IconButton
                          touch={true}
                          tooltip="delete"
                          tooltipPosition="top-center"
                          onTouchTap={this.handleDeleteDialog}
                          ><Delete color={Colors.pinkA200} /></IconButton>
                      </div>

                    </div>
                    </CardHeader>
                    <br />
                    <CardText expandable={true}>
                        <List>
                            {this.renderBucketListItems(this.props.items)}
                        </List>
                        <div>
                          <br />
                          <TextField
                            name="newItemName"
                            hintText="Add an item to the bucketlist..."
                            value={this.state.newItemName}
                            onChange={this.handleFieldChange}
                            onEnterKeyDown={this.handleAddItem}
                          />
                        <FlatButton label="Add"
                          secondary
                          style={{ float: 'right', transform: 'translateY(120%)' }}
                          onClick={this.handleAddItem}
                        />
                      <Checkbox
                        label="Mark item as done"
                        labelPosition="left"
                        name="done"
                        checkedLink={this.makeValueLink('done')}
                        iconStyle={{ marginRight: 5 }}
                        style={ style.checkbox}
                        labelStyle={style.label}
                      />
                        </div>
                    </CardText>
                    <CardActions style={style.right}>
                      <Dialog
                        contentStyle={style.dialog}
                        actions={editDialogActions}
                        modal={false}
                        open={this.state.showEditDialog}
                        onRequestClose={this.handleEditDialog}
                      >
                      <TextField
                        defaultValue={this.props.bucketlist.list_name}
                        name="newName"
                        onEnterKeyDown={this.handleConfirmEdit}
                        onChange={this.handleFieldChange}
                      />
                      <br />
                      {
                        this.state.editNameError ?
                      <span style={style.validationError}>This field is required</span>
                      : null
                      }
                      </Dialog>
                        <Dialog
                          contentStyle={style.dialog}
                          actions={deleteDialogActions}
                          modal={false}
                          open={this.state.showDeleteDialog}
                          onRequestClose={this.handleDeleteDialog}
                        >
                            Delete bucketlist?
                        </Dialog>
                    </CardActions>
                </Card>
            </div>
    );
  }
}
