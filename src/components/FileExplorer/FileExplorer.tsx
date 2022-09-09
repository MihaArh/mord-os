import AppWindow from 'components/AppWindow';
import FlexDiv from 'components/FlexDiv';
import useAppSelector from 'hooks/useAppSelector';
import React, { useEffect, useState } from 'react';

function FileExplorer() {
  const [directoryDepth, setDirectoryDepth] = useState(0);
  const [path, setPath] = useState('');
  const { folderName, subFolders, files } = useAppSelector(state => state.directory);
  const numberOfItems = subFolders.length + (files ? files.length : 0);
  useEffect(() => {
    setPath(prevPath => `${prevPath}\\${folderName}`);
  }, [directoryDepth, folderName]);

  return (
    <AppWindow
      isResizable
      title="File Explorer"
      footerLeft={<FlexDiv>{path}</FlexDiv>}
      footerRight={`${numberOfItems} item${numberOfItems !== 1 ? 's' : ''}`}>
      <FlexDiv>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Size</th>
              <th>Modified</th>
            </tr>
          </thead>
          <tbody>
            {subFolders &&
              subFolders.map(file => (
                <tr key={`${file.folderName}${file.createdAt}`}>
                  <td>{file.folderName}</td>
                  <td>{file.updatedAt}</td>
                  <td>{file.kind}</td>
                </tr>
              ))}
            {files &&
              files.map(file => (
                <tr key={`${file.name}${file.name}`}>
                  <td>{file.name}</td>
                  <td>{file.updatedAt}</td>
                  <td>{file.kind}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </FlexDiv>
    </AppWindow>
  );
}

export default FileExplorer;
