export interface Banner {
  id:               string;
  assetUrl?:         string;
  assetName?:        string | null;
  assetDescription?: string | null;
  location:         string;
  createdAt:        Date;
  updatedAt:        Date;
}
export interface BannerPost {
  AssetFile:         File | null;
  AssetName:        string;
  AssetDescription: string;
  Location:         string;
}
