import { Table, Spin } from 'antd';

const loadingRowsMock = () => {
    let rows = []
    for (let i = 0; i < 6; i++) {
        rows.push({
            key: `loading-${i}`,
            titulo: '.'.repeat(10),
            paciente: '.'.repeat(10),
            observacoes: '.'.repeat(120),
            endDate: '.'.repeat(20)
        });
    }
    return rows;
}

const TratamentosTable = ({ getPageSizeBasedOnScreenSize, tratamentos, columns, loading }) => {
    return (
        <Spin spinning={loading} >
            <Table style={{
                maxHeight: 'calc(100vh - 200px)',
                overflowY: 'auto',
            }}
                columns={columns}
                dataSource={loading ? loadingRowsMock() : tratamentos}
                pagination={getPageSizeBasedOnScreenSize()}
            />
        </Spin>
    );
}

export default TratamentosTable;