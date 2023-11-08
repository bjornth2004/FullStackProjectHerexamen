import {Kot} from '@types';

type Props = {
  koten: Array<Kot>
}
        // geheugensteuntje
        // id: number;
        // huurder: Huurder[];
        // verhuurder: Verhuurder[];
        // actief: boolean;
        // oppervlakte: number;
        // locatie: string;
        // verhuurprijs: number;

const KotOverviewTable: React.FC<Props> = ({koten}: Props) => {
  return (
    <>
      {koten && (
        <table className="table table-hover">
          <thead>
              <tr>
                <th scope="col">Verhuurprijs</th>
                <th scope="col">Locatie</th>
                <th scope="col">Oppervlakte</th>
              </tr>
          </thead>
          <tbody>
            {koten.map((kot, index) => (
              <tr>
                <td>{kot.verhuurprijs}</td>
                <td>{kot.locatie}</td>
                <td>{kot.oppervlakte}</td>
              </tr>
            )
            )}
          </tbody>
      </table>
      )}
    </>
    
  );
};

export default KotOverviewTable;