/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
import { DetailSymbolInformation } from '@codesearch/javascript-typescript-langserver';
import { EuiButtonIcon, EuiComboBox, EuiFlexGroup, EuiFlexItem, EuiSpacer } from '@elastic/eui';
import React from 'react';
import { connect } from 'react-redux';
import { match } from 'react-router-dom';
import { Location } from 'vscode-languageserver';

import { kfetch } from 'ui/kfetch';
import { RepositoryUtils } from '../../../common/repository_utils';
import { FileTree as Tree } from '../../../model';
import { searchQueryChanged } from '../../actions';
import { RootState } from '../../reducers';

import { Breadcrumbs } from '../breadcrumbs/breadcrumbs';
import { FileTree } from '../file_tree/file_tree';
import { Editor } from './editor';

import { history } from '../../utils/url';

const noMarginStyle = {
  margin: 0,
};

interface State {
  children: any[];
  forceOpenPaths: Set<string>;
  node: any;
  showSearchBox: boolean;
}
interface Props {
  match: match<{ [key: string]: string }>;
  searchQueryChanged: (query: string) => void;
  symbols: DetailSymbolInformation[];
  isSymbolsLoading: boolean;
}

export class LayoutPage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      children: [],
      node: null,
      showSearchBox: false,
      forceOpenPaths: new Set([props.match.params.path || '']),
    };
  }

  public componentDidMount() {
    this.fetchTree('').then(() => {
      const pathSegments = (this.props.match.params.path || '').split('/');
      const pathsLength = pathSegments.length;
      if (pathsLength > 0) {
        this.fetchTree(pathSegments[0], pathsLength);
      }
    });
  }

  public onClick = (path: string) => {
    const { resource, org, repo, revision } = this.props.match.params;
    history.push(`/${resource}/${org}/${repo}/${revision}/${path}`);
  };

  public fetchTree(path: string, depth: number = 1) {
    const { resource, org, repo, revision } = this.props.match.params;
    return kfetch({
      pathname: `../api/cs/repo/${resource}/${org}/${repo}/tree/${revision}/${path}`,
      query: { depth },
    }).then((json: any) => {
      this.updateTree(path, json);
    });
  }

  public findNode = (pathSegments: string[], node: Tree) => {
    if (!node) {
      return null;
    } else if (pathSegments.length === 0) {
      return node;
    } else if (pathSegments.length === 1) {
      return (node.children || []).find(n => n.name === pathSegments[0]);
    } else {
      const currentFolder = pathSegments.shift();
      return this.findNode(pathSegments, (node.children || []).find(n => n.name === currentFolder));
    }
  };

  public updateTree = (path: string, tree: Tree) => {
    if (!path) {
      this.setState({ node: tree });
    } else {
      const node = this.findNode(path.split('/'), this.state.node);
      node.children = tree.children;
      this.forceUpdate();
    }
  };

  public getTreeToggler = (path: string) => e => {
    e.preventDefault();
    e.stopPropagation();
    if (this.state.forceOpenPaths.has(path)) {
      this.state.forceOpenPaths.delete(path);
      this.forceUpdate();
    } else {
      this.fetchTree(path);
      this.state.forceOpenPaths.add(path);
      this.forceUpdate();
    }
  };

  public getDirectories = (pathSegments: string[]) => {
    return pathSegments.map((p, index) => {
      if (this.state.node) {
        const node = this.findNode(pathSegments.slice(0, index + 1), this.state.node);
        if (node && node.children) {
          return node.children.map(_ => _.name);
        } else {
          return [];
        }
      } else {
        return [];
      }
    });
  };

  public searchInputOnChangedHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.props.searchQueryChanged(event.target.value);
  };

  public getSymbolLinkUrl = (loc: Location) => {
    return RepositoryUtils.locationToUrl(loc);
  };

  public toggleSearchBox = () => {
    this.setState({ showSearchBox: !this.state.showSearchBox });
  };

  public onChange = (selectedOptions: any[]) => {
    const { symbol } = selectedOptions[0];
    const location = symbol.symbolInformation.location;
    const url = this.getSymbolLinkUrl(location);
    history.push(url);
  };

  public onSearchChange = (searchValue: string) => {
    this.props.searchQueryChanged(searchValue.toLowerCase());
  };

  public render() {
    const { symbols, isSymbolsLoading } = this.props;
    const { resource, org, repo, revision, path, goto } = this.props.match.params;
    const pathSegments = path ? path.split('/') : [];
    const editor = path && (
      <Editor
        file={path}
        goto={goto}
        repoUri={`${resource}/${org}/${repo}`}
        revision={revision || 'HEAD'}
      />
    );

    const symbolOptions = symbols.map((symbol: DetailSymbolInformation) => {
      return {
        label: symbol.symbolInformation.name,
        symbol,
      };
    });

    const searchBox = (
      <EuiFlexItem grow={false} style={noMarginStyle}>
        <EuiFlexGroup
          justifyContent="spaceBetween"
          className="topBar"
          direction="column"
          style={noMarginStyle}
        >
          <EuiFlexItem grow={false} style={noMarginStyle}>
            <EuiComboBox
              placeholder="Search..."
              async={true}
              options={symbolOptions}
              isLoading={isSymbolsLoading}
              onChange={this.onChange}
              onSearchChange={this.onSearchChange}
            />
          </EuiFlexItem>
        </EuiFlexGroup>
      </EuiFlexItem>
    );

    return (
      <EuiFlexGroup direction="column" className="mainRoot" style={noMarginStyle}>
        {this.state.showSearchBox && searchBox}
        <EuiFlexItem grow={false} style={noMarginStyle}>
          <EuiFlexGroup justifyContent="spaceBetween" className="topBar" style={noMarginStyle}>
            <EuiFlexItem grow={false} style={noMarginStyle}>
              <Breadcrumbs
                basePath={`/${resource}/${org}/${repo}/${revision}/`}
                pathSegments={pathSegments}
                directories={this.getDirectories(pathSegments)}
              />
            </EuiFlexItem>
            <EuiFlexItem grow={false}>
              <div>
                <EuiButtonIcon iconType="node" aria-label="node" />
                <EuiButtonIcon iconType="gear" aria-label="config" />
                <EuiButtonIcon
                  iconType="search"
                  aria-label="Toggle Search Box"
                  onClick={this.toggleSearchBox}
                />
              </div>
            </EuiFlexItem>
          </EuiFlexGroup>
        </EuiFlexItem>
        <EuiSpacer size="xs" className="spacer" />
        <EuiFlexItem className="codeMainContainer" style={noMarginStyle}>
          <EuiFlexGroup justifyContent="spaceBetween" className="codeMain">
            <EuiFlexItem grow={false} style={noMarginStyle} className="fileTreeContainer">
              <FileTree
                node={this.state.node}
                onClick={this.onClick}
                forceOpenPaths={this.state.forceOpenPaths}
                getTreeToggler={this.getTreeToggler}
                activePath={path || ''}
              />
            </EuiFlexItem>
            <EuiFlexItem style={noMarginStyle}>{editor}</EuiFlexItem>
          </EuiFlexGroup>
        </EuiFlexItem>
      </EuiFlexGroup>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  symbols: state.search.symbols,
  isSymbolsLoading: state.search.isLoading,
});

const mapDispatchToProps = {
  searchQueryChanged,
};

export const Layout = connect(mapStateToProps, mapDispatchToProps)(LayoutPage);
