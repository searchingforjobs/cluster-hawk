export interface EmbeddingsDistanceReport {
  embeddingsLength: number;
  distances: {
    cosine: number;
    euclidean: number;
  };
  interpretation: {
    cosine: boolean | null;
    cosineThreshold: number | null;
    euclidean: boolean | null;
    euclideanThreshold: number | null;
  };
}
