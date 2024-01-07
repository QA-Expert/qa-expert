import { ReactNode, useMemo } from 'react';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import CheckBoxOutlineBlankOutlinedIcon from '@mui/icons-material/CheckBoxOutlineBlankOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { Props as FeatureProps } from '../features/feature-card';
import { Column } from './column';

type Feature = FeatureProps & {
  checked: boolean;
};

export type Props = {
  icon: ReactNode;
  name: string;
  features: Feature[];
};

export function PlatformColumn({ icon, name, features }: Props) {
  const selected = name === 'qaexpert' ? true : false;

  const rows = useMemo(
    () =>
      features.map((feature) => {
        return {
          element: feature.checked ? (
            <CheckBoxOutlinedIcon
              sx={{
                fontSize: '2rem',
                color: selected ? 'text.primary' : 'secondary.main',
              }}
            />
          ) : (
            <CheckBoxOutlineBlankOutlinedIcon sx={{ fontSize: '2rem' }}>
              <CloseOutlinedIcon />
            </CheckBoxOutlineBlankOutlinedIcon>
          ),
        };
      }),
    [features, selected],
  );

  return <Column icon={icon} name={name} rows={rows} selected={selected} />;
}
