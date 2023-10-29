import { Table } from 'antd';

const MidiasTable = ({ deleteMidias, handleRowSelection, getPageSizeBasedOnScreenSize, shortMidias, columns }) => {
    return (
        <Table style={{
            maxHeight: 'calc(100vh - 200px)',
            overflowY: 'auto',
        }}
            rowSelection={deleteMidias ? {
                type: 'checkbox',
                onSelect: (record, selected, selectedRows, nativeEvent) => {
                    handleRowSelection(record.id, selected);
                },
                onSelectAll: (selected, selectedRows, changeRows) => {
                    for (const row of selectedRows) {
                        handleRowSelection(row.id, selected);
                    }
                }
            } : null}
            columnTitle="Deletar"
            columns={columns}
            dataSource={shortMidias}
            pagination={getPageSizeBasedOnScreenSize()}
        />
    );
}

export default MidiasTable;