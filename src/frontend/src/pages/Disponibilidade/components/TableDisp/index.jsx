import { Table, Spin } from 'antd';

const loadingRowsMock = () => {
    let rows = []
    for (let i = 0; i < 6; i++) {
        rows.push({
            key: `loading-${i}`,
            titulo: '.'.repeat(10),
            descricao: '.'.repeat(120),
            type: '.'.repeat(10),
            createTime: '.'.repeat(20)
        });
    }
    return rows;
}


const TableDisp = ({ deleteDisponibilidades,
    handleRowSelection,
    getPageSizeBasedOnScreenSize,
    disponibilidades,
    columns,
    loadingDisponibilidades: loading }) => {
    return (
        <Spin spinning={loading} >
            <Table style={{
                maxHeight: 'calc(100vh - 200px)',
                overflowY: 'auto',
            }}
                rowSelection={deleteDisponibilidades ? {
                    type: 'checkbox',
                    onSelect: (record, selected) => {
                        handleRowSelection(record.id, selected);
                    },
                    onSelectAll: (selected, selectedRows) => {
                        for (const row of selectedRows) {
                            handleRowSelection(row.id, selected);
                        }
                    }
                } : null}
                columnTitle="Deletar"
                columns={columns}
                dataSource={loading ? loadingRowsMock() : disponibilidades}
                pagination={getPageSizeBasedOnScreenSize()}
            />
        </Spin>
    );
}

export default TableDisp;