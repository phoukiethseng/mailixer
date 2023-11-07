<?php

namespace App\Repositories\Interfaces;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * @template ModelType of Model
 * @template PrimaryKeyType 
 */
interface CRUDRepository
{
    /**
     * @return Collection<ModelType>
     */
    public function findAll();
    /**
     * @param PrimaryKeyType $modelId
     * @return ModelType
     */
    public function findById($modelId);
    /**
     * @param array $attributes
     * @return ModelType
     */
    public function getNewInstance($attributes);
    /**
     * @param ModelType $model
     * @return ModelType
     */
    public function save($model);

    /**
     * @param ModelType $model
     * @return void
     */
    public function delete($model);
}